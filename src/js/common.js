import { refs } from "./refs";

export const slowScroll = () => {
  if (refs.galleryContainer.firstElementChild) {
    const { height: cardHeight } = refs.galleryContainer.firstElementChild.getBoundingClientRect();


  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  } else {
    window.scrollTo(0, 0);
  }
}

