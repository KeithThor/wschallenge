/**Makes a carousel component for a single furniture item. */
const make = (furnitureData) => {
    let carouselRoot = document.createDocumentFragment();

    let overlay = document.createElement("div");
    overlay.classList = "product-carousel-overlay";
    // Exit carousel when the overlay is clicked
    overlay.addEventListener("click", () => overlay.parentElement.removeChild(overlay));
    carouselRoot.appendChild(overlay);

    let carouselContainer = document.createElement("div");
    carouselContainer.classList = "product-carousel";
    overlay.appendChild(carouselContainer);

    let thumbnailContainer = document.createElement("div");
    thumbnailContainer.classList = "product-thumbnail-container";
    carouselContainer.appendChild(thumbnailContainer);

    let mainView = makeMainView(furnitureData.hero);
    carouselContainer.appendChild(mainView);

    // Thumbnail for hero image not included in list of images
    let heroThumb = makeThumbnail(furnitureData.thumbnail);

    // On click, change main view image to that of the clicked thumbnail image
    heroThumb.addEventListener("click", (event) => {
        mainView.children[0].src = heroThumb.children[0].src;
        mainView.children[0].alt = heroThumb.children[0].alt;
        event.stopPropagation();
    });
    thumbnailContainer.appendChild(heroThumb);

    furnitureData.images.forEach(image => {
        let thumbnail = makeThumbnail(image);
        thumbnail.addEventListener("click", () => {
            mainView.children[0].src = thumbnail.children[0].src;
            mainView.children[0].alt = thumbnail.children[0].alt;
            event.stopPropagation();
        });
        thumbnailContainer.appendChild(thumbnail);
    });

    return carouselRoot;
};

/**Makes an image element for the selected image view. */
const makeMainView = (imageData) => {
    let viewContainer = document.createElement("div");
    viewContainer.classList = "product-carousel-view";

    let viewImage = document.createElement("img");
    viewImage.src = imageData.href;
    viewImage.alt = imageData.alt;

    viewContainer.appendChild(viewImage);

    return viewContainer;
}

/**Makes a thumbnail element for a single provided image data. */
const makeThumbnail = (imageData) => {
    let thumbnailContainer = document.createElement("div");
    thumbnailContainer.classList = "product-carousel-thumbnail";

    let thumbnail = document.createElement("img");
    thumbnail.src = imageData.href;
    thumbnail.alt = imageData.alt;

    thumbnailContainer.appendChild(thumbnail);

    return thumbnailContainer;
}

export default { make };