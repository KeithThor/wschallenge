import carouselFactory, { makeMainView, makeThumbnail, createSwapViewFunc } from "./carousel-factory";

describe("make in carousel-factory", () => {
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

    it("should return carousel component when provided valid data.", () => {
        let component = carouselFactory.make(validData);

        expect(component).not.toBeNull();
    });

    it("should throw TypeError when provided no data.", () => {
        expect(carouselFactory.make).toThrowError(TypeError);
    });

    it("should return 4 thumbnails for 3 image thumbnails and 1 hero thumbnail.", () => {
        let images = [];
        let thumbnail = {
            size: "m",
            meta: "",
            alt: "",
            rel: "",
            width: 1,
            href: "https://a-sample-image-host/images/0123941.jpg",
            height: 1
        };

        for (let i = 1; i <= 3; i++) {
            images.push(thumbnail);
        }
        validData.images = images;

        let carousel = carouselFactory.make(validData);
        let thumbnails = carousel.querySelectorAll(".product-carousel-thumbnail");

        expect(thumbnails.length).toBe(4);
    });

    it("should return 7 thumbnails for 6 image thumbnails and 1 hero thumbnail.", () => {
        let images = [];
        let thumbnail = {
            size: "m",
            meta: "",
            alt: "",
            rel: "",
            width: 1,
            href: "https://a-sample-image-host/images/0123941.jpg",
            height: 1
        };

        for (let i = 1; i <= 6; i++) {
            images.push(thumbnail);
        }
        validData.images = images;

        let carousel = carouselFactory.make(validData);
        let thumbnails = carousel.querySelectorAll(".product-carousel-thumbnail");

        expect(thumbnails.length).toBe(7);
    });
});

describe("makeMainView in carousel-factory", () => {
    let validData = {};
    beforeEach(() => {
        validData = {
            size: "m",
            meta: "",
            alt: "",
            rel: "",
            width: 1,
            href: "https://a-sample-image-host/images/0123941.jpg",
            height: 1
        };
    });

    it("should return TypeError when provided no data.", () => {
        expect(makeMainView).toThrowError(TypeError);
    });

    it("should return not null when provided valid data.", () => {
        let component = makeMainView(validData);

        expect(component).not.toBeNull();
    });

    it("should return a component with an image containing the correct src attribute.", () => {
        validData.href = "https://b-sample-imager/images/1231232.jpg";
        let component = makeMainView(validData);

        let image = component.querySelector(".product-carousel-view img");

        expect(image.src).toBe("https://b-sample-imager/images/1231232.jpg");
    });
});

describe("makeThumbnail in carousel-factory", () => {
    let validData = {};
    beforeEach(() => {
        validData = {
            size: "m",
            meta: "",
            alt: "",
            rel: "",
            width: 1,
            href: "https://a-sample-image-host/images/0123941.jpg",
            height: 1
        };
    });

    it("should return TypeError when provided no data.", () => {
        expect(makeThumbnail).toThrowError(TypeError);
    });

    it("should return not null when provided valid data.", () => {
        let component = makeThumbnail(validData);

        expect(component).not.toBeNull();
    });

    it("should return a component with an image containing the correct src attribute.", () => {
        validData.href = "https://b-sample-imager/images/1231232.jpg";
        let component = makeThumbnail(validData);

        let image = component.querySelector(".product-carousel-thumbnail img");

        expect(image.src).toBe("https://b-sample-imager/images/1231232.jpg");
    });
});

describe("createSwapViewFunc in carousel-factory", () => {
    let viewElement;
    let myElement;
    let allElements;
    let fakeEvent;

    beforeEach(() => {
        viewElement = document.createElement("div");
        let viewImg = document.createElement("img");
        viewImg.src = "viewElements src";
        viewElement.appendChild(viewImg);

        myElement = document.createElement("div");
        let myImg = document.createElement("img");
        myImg.src = "myElements src";
        myElement.appendChild(myImg);

        allElements = [];
        for(let i = 0; i < 5; i++){
            let mockElement = document.createElement("div");
            let mockImg = document.createElement("img");
            mockImg.src = "mocks src";
            mockElement.appendChild(mockImg);
            allElements.push(mockElement);
        }
        allElements.push(myElement);

        fakeEvent = {
            stopPropagation: () => console.log()
        }
    });

    it("should return a function", () => {
        let func = createSwapViewFunc();

        expect(typeof func).toBe("function");
    });

    it("should swap the src value of one element with another when the return function is called.", () => {
        createSwapViewFunc(viewElement, myElement, allElements)(fakeEvent);

        expect(viewElement.children[0].src).toBe(myElement.children[0].src);
    });
});