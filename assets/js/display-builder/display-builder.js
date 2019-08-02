import componentFactory from "../component-factory/component-factory";

/**Builds the components for every piece of furniture in the provided json data and returns a documentFragment containing
 * the elements. */
const build = (data) => {
    let fragment = document.createDocumentFragment();
    let furnitureData = data.groups;

    furnitureData.forEach(furniture => {
        try {
            fragment.appendChild(componentFactory.make(furniture));
        }
        catch (err) {
            if (err instanceof TypeError){
                return;
            }
            else throw err;
        }
    });

    return fragment;
};

export default { build };