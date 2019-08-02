import carouselFactory, { makeMainView, makeThumbnail } from "./carousel-factory";

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