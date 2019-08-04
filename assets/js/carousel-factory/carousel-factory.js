/**Makes a carousel component for a single furniture item. */
export const make = (furnitureData) => {
    let carouselRoot = document.createDocumentFragment();

    let overlay = document.createElement("div");
    overlay.classList = "product-carousel-overlay";
    addOverlayListeners(overlay);
    
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
    heroThumb.classList.add("product-carousel-active");
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

    let exitButton = makeExitButton();
    carouselContainer.appendChild(exitButton);

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

/**Adds event listeners to the provided carousel overlay. */
const addOverlayListeners = (overlay) => {
    // Exit carousel when the overlay is clicked
    //overlay.addEventListener("click", createCloseCarouselFunc());

    // Prevents focusing elements not in overlay.
    overlay.addEventListener("keydown", (event) => {
        if (event.key === "Tab"){
            console.log("tab was pressed");
            let thumbnailContainer = document.querySelector(".product-thumbnail-container");
            let lastThumbnail = thumbnailContainer.children[thumbnailContainer.children.length - 1];
            let exitButton = document.querySelector(".product-carousel-exit");

            if (document.activeElement === lastThumbnail){
                event.preventDefault();
                exitButton.focus();
            }
            else if (document.activeElement === exitButton){
                event.preventDefault();
                let firstThumbnail = thumbnailContainer.children[0];
                firstThumbnail.focus();
            }
        }
    });
};

/**Creates a function that closes the carousel when called. */
const createCloseCarouselFunc = () => {
    return (event) => {
        let carousel = document.querySelector("#carousel");
        carousel.innerHTML = "";
        carousel.setAttribute("aria-disabled", true)

        let contentElement = document.getElementById("content");
        contentElement.setAttribute("aria-disabled", false);
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

/**Creates a button to exit the carousel. */
export const makeExitButton = () => {
    let exit = document.createElement("button");
    exit.classList = "product-carousel-exit";

    let exitImg = document.createElement("img");
    exitImg.src = "./dist/icons8-close-window-50.png";
    exitImg.alt = "Press this button to close this panel.";

    exit.appendChild(exitImg);
    exit.addEventListener("click", createCloseCarouselFunc());

    return exit;
};

/**Makes a thumbnail element for a single provided image data. */
export const makeThumbnail = (imageData) => {
    let thumbnailContainer = document.createElement("button");
    thumbnailContainer.classList = "product-carousel-thumbnail";

    let thumbnail = document.createElement("img");
    thumbnail.src = imageData.href;
    thumbnail.alt = imageData.alt;

    thumbnailContainer.appendChild(thumbnail);

    return thumbnailContainer;
}

export default { make };