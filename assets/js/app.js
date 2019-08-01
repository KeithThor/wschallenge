import fetcher from "./fetcher/fetcher.js";

fetcher.fetchDataAsync().then((data) => {
    let body = document.getElementById("content");

    body.innerHTML = data;
})