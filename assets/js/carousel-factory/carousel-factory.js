/**Makes a carousel component for a single furniture item. */
export const make = (furnitureData) => {
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

    let thumbnails = [];
    // Thumbnail for hero image not included in list of images
    let heroThumb = makeThumbnail(furnitureData.thumbnail);
    heroThumb.classList.add("product-carousel-active")
    thumbnails.push(heroThumb);

    // On click, change main view image to that of the clicked thumbnail image
    heroThumb.addEventListener("click", createSwapViewFunc(mainView, heroThumb, thumbnails));
    thumbnailContainer.appendChild(heroThumb);

    furnitureData.images.forEach(image => {
        let thumbnail = makeThumbnail(image);
        thumbnail.addEventListener("click", createSwapViewFunc(mainView, thumbnail, thumbnails));
        thumbnails.push(thumbnail);
        thumbnailContainer.appendChild(thumbnail);
    });

    return carouselRoot;
};

/**Creates a function that will swap the main view image with the thumbnail image. */
export const createSwapViewFunc = (mainView, swap, allThumbnails) => {
    return (event) => {
        event.stopPropagation();
        mainView.children[0].src = swap.children[0].src;
        mainView.children[0].alt = swap.children[0].alt;
        allThumbnails.forEach(thumbnail => {
            thumbnail.classList.remove("product-carousel-active");
        });
        swap.classList.add("product-carousel-active");
    };
}

/**Makes an image element for the selected image view. */
export const makeMainView = (imageData) => {
    let viewContainer = document.createElement("div");
    viewContainer.classList = "product-carousel-view";

    let viewImage = document.createElement("img");
    viewImage.src = imageData.href;
    viewImage.alt = imageData.alt;

    viewContainer.appendChild(viewImage);
    viewContainer.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    return viewContainer;
}

/**Makes a thumbnail element for a single provided image data. */
export const makeThumbnail = (imageData) => {
    let thumbnailContainer = document.createElement("div");
    thumbnailContainer.classList = "product-carousel-thumbnail";

    let thumbnail = document.createElement("img");
    thumbnail.src = imageData.href;
    thumbnail.alt = imageData.alt;

    thumbnailContainer.appendChild(thumbnail);

    return thumbnailContainer;
}

export default { make };