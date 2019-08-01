import fetcher from "../fetcher/fetcher.js";
import componentFactory from "../component-factory/component-factory";

const buildAsync = async () => {
    let data = await fetcher.fetchDataAsync();
    componentFactory.make();
};

export default { build };