import carouselFactory from "../carousel-factory/carousel-factory";

/**Makes a DocumentFragment that displays all of the required display elements for one provided furniture's data. */
export const make = (data) => {
    let componentRoot = document.createDocumentFragment();

    let componentContainer = document.createElement("div");
    componentContainer.classList = "product";
    
    componentContainer.appendChild(makeCompoundName(data));
    componentContainer.appendChild(makeProductHero(data));
    componentContainer.appendChild(makeMessages(data.messages));
    componentContainer.appendChild(makeReviews(data.reviews));

    componentRoot.appendChild(componentContainer);

    return componentRoot;
};

/**Constructs a compound name element that contains flag elements within the product name element. */
export const makeCompoundName = (data) => {
    let productName = makeProductName(data);

    let newCore = data.flags.find(flag => flag.id === "newcore");
    if (newCore != null){
        productName.insertBefore(makeNewcoreFlag(), productName.firstChild);
    }

    let otherFlags = data.flags.filter(flag => flag.id !== "newcore");
    productName.appendChild(makeFlags(otherFlags));

    return productName;
}

/**Constructs a name element for a product for the product's JSON data. */
export const makeProductName = (data) => {
    let nameElement = document.createElement("div");
    nameElement.classList = "product-name";

    let nameLink = document.createElement("a");
    nameLink.href = data.links.www;
    nameLink.innerHTML = data.name;

    nameElement.appendChild(nameLink);

    nameElement.appendChild(makeProductPrice(data.priceRange));

    return nameElement;
};

/**Constructs a product price element for a product using the product's JSON data. */
export const makeProductPrice = (priceRange) => {
    let priceElement = document.createElement("div");
    priceElement.classList = "product-price";
    priceElement.innerText = ` $${priceRange.selling.low} - $${priceRange.selling.high}`;

    return priceElement;
};

/**Constructs a product hero image element for a product using the product's JSON data. */
export const makeProductHero = (furniture) => {
    let heroParent = document.createElement("div");
    heroParent.classList = "product-hero";

    let heroImg = document.createElement("img");
    heroImg.src = furniture.hero.href;
    heroImg.alt = furniture.hero.alt + "(Click to see more pictures)";
    heroImg.title = "Click to see more pictures.";

    heroParent.appendChild(heroImg);

    // Adds a click event listener to construct the carousel component using the current furniture's data.
    heroParent.addEventListener("click", createHeroClickFunc(furniture));

    return heroParent;
};

/**Creates a function to handle click events for clicking on a Hero Img. */
export const createHeroClickFunc = (furniture) => {
    return (event) => {
        let carouselFragment;
        try {
            carouselFragment = carouselFactory.make(furniture);
        }
        catch (err) {
            if (err instanceof TypeError) {
                return;
            }
            else throw err;
        }

        let carouselElement = document.getElementById("carousel");
        carouselElement.innerHTML = "";
        carouselElement.setAttribute("aria-disabled", false);
        carouselElement.appendChild(carouselFragment);
        
        // Place focus on first thumbnail in the thumbnail container
        let thumbnailContainer = carouselElement.querySelector(".product-thumbnail-container");
        thumbnailContainer.children[0].focus();

        let contentElement = document.getElementById("content");
        contentElement.setAttribute("aria-disabled", true);
    };
}

/**Constructs a reviews element with recommendations, reviews counts, and ratings. */
export const makeReviews = (reviews) => {
    let reviewParent = document.createElement("div");
    reviewParent.classList = "product-reviews";

    reviewParent.appendChild(makeRecommendations(reviews));
    reviewParent.appendChild(makeReviewsCount(reviews));
    reviewParent.appendChild(makeRatings(reviews));

    return reviewParent;
};

/**Constructs a recommendations element with the provided reviews data. */
export const makeRecommendations = (reviews) => {
    let recommendations = document.createElement("div");
    recommendations.innerText = `Recommendations: ${reviews.recommendationCount}`;
    recommendations.classList = "product-recommendations";

    return recommendations;
}

/**Constructs a reviews count element with the provided reviews data. */
export const makeReviewsCount = (reviews) => {
    let reviewsCount = document.createElement("div");
    reviewsCount.innerText = `Reviews: ${reviews.reviewCount}`;
    reviewsCount.classList = "product-reviews-count";

    return reviewsCount;
}

/**Constructs a ratings element with the provided reviews data. */
export const makeRatings = (reviews) => {
    let ratings = document.createElement("div");
    ratings.innerText = `Average Rating: `;
    ratings.classList = "product-ratings";

    let ratingsStars = document.createElement("span");
    ratingsStars.classList = "product-ratings-stars";

    for(let i = 1; i <= 5; i++) {
        if (i <= reviews.averageRating){
            ratingsStars.innerHTML += "&#9733"
        }
        else {
            ratingsStars.innerHTML += "&#9734"
        }
    }
    ratings.appendChild(ratingsStars);

    return ratings;
}

/**Constructs a messages element from the provided array of string messages. */
export const makeMessages = (messages) => {
    let messagesParent = document.createElement("div");
    messagesParent.classList = "product-messages";

    messages.forEach(message => {
        let messageChild = document.createElement("div");
        messageChild.classList = "product-message";
        messageChild.innerText = message;

        messagesParent.appendChild(messageChild);
    });

    return messagesParent;
};

/**Constructs an element that contains all of the flags for a given furniture item. */
export const makeFlags = (flags) => {
    let flagsParent = document.createElement("div");
    flagsParent.classList = "product-flags";

    flags.forEach(flag => {
        if (flag.bopisSuppress) return;

        switch(flag.id){
            case "organic":
                flagsParent.appendChild(MakeOrganicFlag());
                break;
            case "fairTrade":
                flagsParent.appendChild(makeFairTradeFlag());
                break;
            default:
                break;
        }
    });

    return flagsParent;
};

/**Constructs a 'New' flag component. */
export const makeNewcoreFlag = () => {
    let flag = document.createElement("div");
    flag.classList = "product-flag product-flag-newcore";
    flag.innerText = "New";
    flag.title = "This is a brand new furniture piece!";

    return flag;
}

/**Constructs a 'Fair Trade' flag component. */
export const makeFairTradeFlag = () => {
    let flag = document.createElement("div");
    flag.classList = "product-flag product-flag-fairtrade";

    let img = document.createElement("img");
    img.src = "dist/icons8-work-26.png";
    img.alt = "This item was made in a Fair Trade Certified facility, directly benefiting the workers who make it.";
    img.title = "This item was made in a Fair Trade Certified facility, directly benefiting the workers who make it.";

    flag.appendChild(img);

    return flag;
}

/**Constructs an 'Organic' flag component. */
export const MakeOrganicFlag = () => {
    let flag = document.createElement("div");
    flag.classList = "product-flag product-flag-organic";

    let img = document.createElement("img");
    img.src = "dist/icons8-leaf-24.png";
    img.alt = "This item is Certified to the Organic Content Standard (OCS).";
    img.title = "This item is Certified to the Organic Content Standard (OCS).";

    flag.appendChild(img);

    return flag;
}

export default { make };