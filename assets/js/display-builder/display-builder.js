import componentFactory from "../component-factory/component-factory";

/**Builds the components for every piece of furniture in the provided json data. */
const build = (data) => {
    let fragment = document.createDocumentFragment();
    let furnitureData = data.groups;

    furnitureData.forEach(furniture => {
        fragment.appendChild(componentFactory.make(furniture));
    });

    return fragment;
};

export default { build };