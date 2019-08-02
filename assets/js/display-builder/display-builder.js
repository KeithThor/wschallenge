import componentFactory from "../component-factory/component-factory";
import carouselFactory from "../carousel-factory/carousel-factory";

/**Builds the components for every piece of furniture in the provided json data and returns a documentFragment containing
 * the elements. */
const build = (data) => {
    let fragment = document.createDocumentFragment();
    let furnitureData = data.groups;

    furnitureData.forEach(furniture => {
        let component = componentFactory.make(furniture);

        // Add event listener to hero image to show carousel
        let heroImg = component.querySelector(".product-hero");
        heroImg.addEventListener("click", () => {
            let carouselFragment = carouselFactory.make(furniture);
            let carouselElement = document.getElementById("carousel");
            carouselElement.innerHTML = "";
            carouselElement.appendChild(carouselFragment);
        });

        fragment.appendChild(component);
    });

    return fragment;
};

export default { build };