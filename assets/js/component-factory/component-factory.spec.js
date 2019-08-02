import componentFactory, { makeProductName, makeProductPrice, makeProductHero, makeReviews, makeFlags } from "./component-factory";

describe("make from component-factory", () => {
    let validData = {};

    // Reset valid data object
    beforeEach(() => {
        validData = {
            id: "id",
            name: "name",
            links: { www: "www" },
            priceRange: { selling: { high: 2, low: 1 } },
            thumbnail: {
                size: "m",
                meta: "",
                alt: "",
                rel: "",
                width: 1,
                href: "alink",
                height: 1
            },
            hero: {
                size: "m",
                meta: "",
                alt: "",
                rel: "",
                width: 1,
                href: "alink",
                height: 1
            },
            images: [{
                size: "m",
                meta: "",
                alt: "",
                rel: "",
                width: 1,
                href: "alink",
                height: 1
            }],
            swatches: [],
            messages: ["Mesage"],
            flags: [{
                bopisSuppress: false,
                rank: 1,
                id: "id"
            }],
            reviews: {
                recommendationCount: 0,
                likelihood: 0,
                reviewCount: 0,
                averageRating: 0,
                id: "id",
                type: "type"
            }
        }
    });

    it("should return not null when provided valid data.", () => {
        let component = componentFactory.make(validData);

        expect(component).not.toBeNull();
    });

    it("should return TypeError when provided no data.", () => {
        expect(componentFactory.make).toThrowError(TypeError);
    });

    it("should return component with all expected pieces.", () => {
        let component = componentFactory.make(validData);

        let container = component.querySelector(".product");
        let name = component.querySelector(".product-name");
        let price = component.querySelector(".product-price");
        let hero = component.querySelector(".product-hero");
        let reviews = component.querySelector(".product-reviews");
        let messages = component.querySelector(".product-messages");
        let flags = component.querySelector(".product-flags");

        expect(container).not.toBeNull();
        expect(name).not.toBeNull();
        expect(price).not.toBeNull();
        expect(hero).not.toBeNull();
        expect(reviews).not.toBeNull();
        expect(messages).not.toBeNull();
        expect(flags).not.toBeNull();
    });
});

describe("makeName from component-factory", () => {
    let validData = {};
    beforeEach(() => {
        validData = { 
            name: "name",
            links: { www: "https://a-link-to-furniture.com/id/5123123" }
        };
    });

    it("should return not null with valid data.", () => {
        let component = makeProductName(validData);

        expect(component).not.toBeNull();
    });

    it("should throw TypeError with null data.", () => {
        expect(makeProductName).toThrowError(TypeError);
    });

    it("should return component with name of 'comfy sofa'.", () => {
        validData.name = "comfy sofa";
        let component = makeProductName(validData);

        let nameLink = component.querySelector(".product-name a");

        expect(nameLink.innerHTML).toContain("comfy sofa");
    });

    it("should return component with correct name link href.", () => {
        validData.links.www = "https://a-test-link.com/sub/posts/123123";
        let component = makeProductName(validData);

        let nameLink = component.querySelector(".product-name a");

        expect(nameLink.href).toBe("https://a-test-link.com/sub/posts/123123");
    });
});

describe("makeProductPrice from component-factory", () => {
    let validData = {};
    beforeEach(() => {
        validData = { 
            selling: {
                high: 100,
                low: 50
            }
        };
    });

    it("should return not null with valid data.", () => {
        let component = makeProductPrice(validData);

        expect(component).not.toBeNull();
    });

    it("should throw TypeError with null data.", () => {
        expect(makeProductPrice).toThrowError(TypeError);
    });

    it("should return component with both prices contained.", () => {
        validData.selling.low = 15;
        validData.selling.high = 53;
        let component = makeProductPrice(validData);

        expect(component.innerHTML).toContain("$15");
        expect(component.innerHTML).toContain("$53");
    });
});

describe("makeProductHero from component-factory", () => {
    let validData = {};

    // Reset valid data object
    beforeEach(() => {
        validData = {
            hero: {
                size: "m",
                meta: "",
                alt: "",
                rel: "",
                width: 1,
                href: "alink",
                height: 1
            }
        }
    });

    it("should return not null when provided valid data.", () => {
        let component = makeProductHero(validData);

        expect(component).not.toBeNull();
    });

    it("should return TypeError when provided no data.", () => {
        expect(makeProductHero).toThrowError(TypeError);
    });

    it("should return component with correct hero image src.", () => {
        validData.hero.href = "https://a-sample-image-host/img/213123.jpg";
        let component = makeProductHero(validData);

        let heroImg = component.querySelector(".product-hero img");

        expect(heroImg.src).toBe("https://a-sample-image-host/img/213123.jpg");
    });
});

describe("makeReviews from component-factory", () => {
    let validData = {};

    // Reset valid data object
    beforeEach(() => {
        validData = {
            reviews: {
                recommendationCount: 0,
                likelihood: 0,
                reviewCount: 0,
                averageRating: 0,
                id: "id",
                type: "type"
            }
        }
    });

    it("should return not null when provided valid data.", () => {
        let component = makeReviews(validData);

        expect(component).not.toBeNull();
    });

    it("should return TypeError when provided no data.", () => {
        expect(makeReviews).toThrowError(TypeError);
    });

    it("should return component with all review components intact.", () => {
        let component = makeReviews(validData);

        let recommendations = component.querySelector(".product-reviews .product-recommendations");
        let reviewsCount = component.querySelector(".product-reviews .product-reviews-count");
        let ratings = component.querySelector(".product-reviews .product-ratings");

        expect(component.children.length).toBe(3);
        expect(recommendations).not.toBeNull();
        expect(reviewsCount).not.toBeNull();
        expect(ratings).not.toBeNull();
    });
});

describe("makeFlags in component-factory", () => {
    let validData = [];

    // Reset valid data object
    beforeEach(() => {
        validData = [{
            bopisSuppress: false,
            rank: 1,
            id: "organic"
        }];
    });

    it("should return not null when provided valid data.", () => {
        let component = makeFlags(validData);

        expect(component).not.toBeNull();
    });

    it("should return TypeError when provided no data.", () => {
        expect(makeFlags).toThrowError(TypeError);
    });

    it("should return a component with newcore flag.", () => {
        validData = [{
            bopisSuppress: false,
            rank: 1,
            id: "newcore"
        }];

        let component = makeFlags(validData);
        let newCore = component.querySelector(".product-flags .product-flag-newcore");

        expect(component.children.length).toBe(1);
        expect(newCore).not.toBeNull();
    });

    it("should return a component with organic flag.", () => {
        let component = makeFlags(validData);
        let organic = component.querySelector(".product-flags .product-flag-organic");

        expect(component.children.length).toBe(1);
        expect(organic).not.toBeNull();
    });

    it("should return a component with fairtrade flag.", () => {
        validData = [{
            bopisSuppress: false,
            rank: 1,
            id: "fairTrade"
        }];

        let component = makeFlags(validData);
        let fairTrade = component.querySelector(".product-flags .product-flag-fairtrade");

        expect(component.children.length).toBe(1);
        expect(fairTrade).not.toBeNull();
    });

    it("should return a component with an organic and fairtrade flags.", () => {
        validData = [
            {
                bopisSuppress: false,
                rank: 1,
                id: "fairTrade"
            },
            {
                bopisSuppress: false,
                rank: 1,
                id: "organic"
            }
        ];

        let component = makeFlags(validData);
        let fairTrade = component.querySelector(".product-flags .product-flag-fairtrade");
        let organic = component.querySelector(".product-flags .product-flag-organic");

        expect(component.children.length).toBe(2);
        expect(fairTrade).not.toBeNull();
        expect(organic).not.toBeNull();
    });
});