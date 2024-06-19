export const drawHTML = (elem, data) => {
    elem.insertAdjacentHTML('beforeend', createItemCard(data))
}

function createItemCard(cards) {
    return cards.map(({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads }) => `
    <a class="link" href="${largeImageURL}">
        <div class="photo-card">
        <div class="img-link">
            <img class="item-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </div>
        <div class="info">
            <div class="info-item-wrap">
                <p class="info-item">
                    <b>Likes</b>
                </p>
                <p>
                ${likes}
                </p>
            </div>
            <div class="info-item-wrap">
                <p class="info-item">
                    <b>Views</b>
                </p>

                <p>
                    ${views}
                </p>
            </div>
            <div class="info-item-wrap">
                <p class="info-item">
                    <b>Comments</b>
                </p>
                <p>
                    ${comments}
                </p>
            </div>
            <div class="info-item-wrap">
                <p class="info-item">
                    <b>Downloads</b>
                </p>
                <p>
                    ${downloads}
                </p>
            </div>
        </div>
    </div>
    </a>
`).join('');
}


