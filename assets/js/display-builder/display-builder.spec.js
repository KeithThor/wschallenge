import displayBuilder from "./display-builder";

describe("build from display-builder", () => {
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

    it("should create 10 components for 10 provided furniture data.", () => {
        let furnitureArray = [];
        for (let i = 1; i <= 10; i++) {
            furnitureArray.push(validData);
        }
        let largeData = {
            groups: furnitureArray
        };

        let display = displayBuilder.build(largeData);
        let products = display.querySelectorAll(".product");

        expect(products.length).toBe(10);
    });

    it("should create 4 components for 4 provided furniture data.", () => {
        let furnitureArray = [];
        for (let i = 1; i <= 4; i++) {
            furnitureArray.push(validData);
        }
        let largeData = {
            groups: furnitureArray
        };

        let display = displayBuilder.build(largeData);
        let products = display.querySelectorAll(".product");

        expect(products.length).toBe(4);
    });

    it("should create no components for 0 provided furniture data.", () => {
        let furnitureArray = [];
        let largeData = {
            groups: furnitureArray
        };

        let display = displayBuilder.build(largeData);
        let products = display.querySelectorAll(".product");

        expect(products.length).toBe(0);
    });

    it("should create 4 components for 7 provided furnitures, 3 of which are empty objects.", () => {
        let furnitureArray = [];
        for (let i = 1; i <= 7; i++) {
            if (i >= 5){
                furnitureArray.push({});
            }
            else {
                furnitureArray.push(validData);
            }
        }
        let largeData = {
            groups: furnitureArray
        };

        let display = displayBuilder.build(largeData);
        let products = display.querySelectorAll(".product");

        expect(products.length).toBe(4);
    });

    it("should throw TypeError when provided no data.", () => {
        expect(displayBuilder.build).toThrowError(TypeError);
    });
});