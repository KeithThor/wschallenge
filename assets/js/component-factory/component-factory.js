/**Makes a DocumentFragment that displays all of the required display elements for one provided furniture's data. */
const make = (data) => {
    let componentRoot = document.createDocumentFragment();

    let componentContainer = document.createElement("div");
    componentContainer.classList = "product";
    
    componentContainer.appendChild(makeProductName(data));
    componentContainer.appendChild(makeProductPrice(data.priceRange));
    componentContainer.appendChild(makeProductHero(data.hero));
    componentContainer.appendChild(makeReviews(data.reviews));
    componentContainer.appendChild(makeMessages(data.messages));
    componentContainer.appendChild(makeFlags(data.flags));

    componentRoot.appendChild(componentContainer);

    return componentRoot;
};

/**Constructs a name element for a product for the product's JSON data. */
const makeProductName = (data) => {
    let nameElement = document.createElement("div");
    nameElement.classList = "product-name";

    let nameLink = document.createElement("a");
    nameLink.href = data.links.www;
    nameLink.target = "_blank";
    nameLink.innerHTML = data.name;

    nameElement.appendChild(nameLink);

    return nameElement;
};

/**Constructs a product price element for a product using the product's JSON data. */
const makeProductPrice = (priceRange) => {
    let priceElement = document.createElement("div");
    priceElement.classList = "product-price";
    priceElement.innerText = `$${priceRange.selling.low} - $${priceRange.selling.high}`;

    return priceElement;
};

/**Constructs a product hero image element for a product using the product's JSON data. */
const makeProductHero = (hero) => {
    let heroParent = document.createElement("div");
    heroParent.classList = "product-hero";

    let heroImg = document.createElement("img");
    heroImg.src = hero.href;
    heroImg.alt = hero.alt;

    heroParent.appendChild(heroImg);

    return heroParent;
};

/**Constructs a reviews element with recommendations, reviews counts, and ratings. */
const makeReviews = (reviews) => {
    let reviewParent = document.createElement("div");
    reviewParent.classList = "product-review";

    reviewParent.appendChild(makeRecommendations(reviews));
    reviewParent.appendChild(makeReviewsCount(reviews));
    reviewParent.appendChild(makeRatings(reviews));

    return reviewParent;
};

/**Constructs a recommendations element with the provided reviews data. */
const makeRecommendations = (reviews) => {
    let recommendations = document.createElement("div");
    recommendations.innerText = `Recommendations: ${reviews.recommendationCount}`;
    recommendations.classList = "product-recommendations";

    return recommendations;
}

/**Constructs a reviews count element with the provided reviews data. */
const makeReviewsCount = (reviews) => {
    let reviewsCount = document.createElement("div");
    reviewsCount.innerText = `Reviews: ${reviews.reviewCount}`;
    reviewsCount.classList = "product-review-count";

    return reviewsCount;
}

/**Constructs a ratings element with the provided reviews data. */
const makeRatings = (reviews) => {
    let ratings = document.createElement("div");
    ratings.innerText = `Average Rating: ${reviews.averageRating}`;
    ratings.classList = "product-rating";

    return ratings;
}

/**Constructs a messages element from the provided array of string messages. */
const makeMessages = (messages) => {
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
const makeFlags = (flags) => {
    let flagsParent = document.createElement("div");
    flagsParent.classList = "product-flags";

    flags.forEach(flag => {
        if (flag.bopisSuppress) return;

        switch(flag.id){
            case "newcore":
                flagsParent.appendChild(makeNewcoreFlag());
                break;
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
const makeNewcoreFlag = () => {
    let flag = document.createElement("div");
    flag.classList = "product-flag-newcore";
    flag.innerText = "New";

    return flag;
}

/**Constructs a 'Fair Trade' flag component. */
const makeFairTradeFlag = () => {
    let flag = document.createElement("div");
    flag.classList = "product-flag-fairtrade";
    flag.innerText = "Fair Trade";

    return flag;
}

/**Constructs an 'Organic' flag component. */
const MakeOrganicFlag = () => {
    let flag = document.createElement("div");
    flag.classList = "product-flag-organic";
    flag.innerText = "Organic";

    return flag;
}

export default { make };