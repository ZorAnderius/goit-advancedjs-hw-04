import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./api";
import { showError, showInfo, showSuccessNotification } from "./notification";
import { drawHTML } from "./drawHTML";
import { refs } from "./refs";

const per_page = 40;
let page = 1;
let currentInput = '';

const lightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

const handlerLoadMore = async () => {
    const value = currentInput;
    if (value) {
        page++;
        const {totalHits, hits } = await fetchImages(value, page, per_page);
        drawHTML(refs.galleryContainer, hits);
        lightBox.refresh();

        const totalPages = Math.ceil(totalHits / per_page);
        if (page >= totalPages) {
            refs.btnLoadMore.classList.replace('btn-load','btn-hidden'); 
            refs.btnLoadMore.removeEventListener('click', handlerLoadMore);
            showSuccessNotification("We're sorry, but you've reached the end of search results.");
        }
        
    }
}

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
            addLoadMoreBtn(totalHits);
            lightBox.refresh();
            showSuccessNotification(`Hooray! We found ${totalHits} images.`);
        }
    } catch (error) {
        cleanAll();
        showError(error.message ? error.message : error)
    }
}

function isValid(inputValue) {
    if (currentInput && inputValue && currentInput === inputValue) {
        return false;
    }

    if (inputValue) {
        currentInput = inputValue;
        return inputValue;
    } else {
        throw new Error('Invalid data');
    }
}

function addLoadMoreBtn(totalHits) {
    const totalPages = Math.ceil(totalHits / per_page);
    if (page < totalPages) {
        refs.btnLoadMore.classList.replace('btn-hidden', 'btn-load');
        refs.btnLoadMore.addEventListener('click', handlerLoadMore);
    } else {
        showSuccessNotification("We're sorry, but you've reached the end of search results.");
    }
}


function cleanAll() {
    refs.galleryContainer.innerHTML = '';
    refs.btnLoadMore.classList.replace('btn-load','btn-hidden');
    page = 1;
}