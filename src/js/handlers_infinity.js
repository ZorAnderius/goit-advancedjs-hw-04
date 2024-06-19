import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./api";
import { showError, showInfo, showSuccessNotification } from "./notification";
import { drawHTML } from "./drawHTML";
import { refs } from "./refs";
import { slowScroll } from "./common";

const per_page = 40;
let page = 1;
let currentInput = '';

let optionIntersection = {
    root: null,
    rootMargin: "300px",
}

const observer = new IntersectionObserver(handlerLoadMore, optionIntersection);

const lightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 350,
});


export const handlerSubmit = async (e) => {
    e.preventDefault();
    const value = e.target.elements[0].value.trim().toLowerCase();
    try {
        if (isValid(value)) {
            cleanAll();
            const { total, totalHits, hits } = await fetchImages(value, page, per_page);
            if (!total) {
                showInfo("Sorry, there are no images matching your search query. Please try again.");
                return;
            } 
            drawHTML(refs.galleryContainer, hits);
            addObserver(totalHits);
            lightBox.refresh();
            showSuccessNotification(`Hooray! We found ${totalHits} images.`);
        }
    } catch (error) {
        cleanAll();
        refs.form.reset();
        showError(error.message ? error.message : error)
    }
}

async function handlerLoadMore(entries) {
    entries.forEach(async entry => {
        if (entry.isIntersecting) {
            page++;
            slowScroll();
            const data = await fetchImages(currentInput, page, per_page);
            drawHTML(refs.galleryContainer, data.hits);
            lightBox.refresh();
            const totalPages = Math.ceil(data.totalHits / per_page);
            if (page >= totalPages) {
                observer.unobserve(refs.guardScroll);
                showSuccessNotification("We're sorry, but you've reached the end of search results.");
            }
        }
    });
    
}

function isValid(inputValue) {
    if (!!currentInput && !!inputValue && currentInput === inputValue) {
        return false;
    }

    if (!!inputValue) {
        currentInput = inputValue;
        return true;
    } else {
        throw new Error('Invalid data');
    }
}

function addObserver(totalHits) {
    const totalPages = Math.ceil(totalHits / per_page);
    if (page < totalPages) {
        observer.observe(refs.guardScroll);
    }
}

function cleanAll() {
    refs.galleryContainer.innerHTML = '';
    observer.unobserve(refs.guardScroll);
    page = 1;
}