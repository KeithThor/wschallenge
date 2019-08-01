import fetcher from "./fetcher/fetcher.js"
import displayBuilder from "./display-builder/display-builder.js";

(async () => {
    let data = await fetcher.fetchDataAsync();
    let display = displayBuilder.build(data);

    let root = document.getElementById("content");
    root.appendChild(display);
})();