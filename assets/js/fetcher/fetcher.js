/**Fetches the Williams-Sonoma data asynchronously. */
const fetchDataAsync = async (overrideUrl) => {
    let fetchUrl = "./dist/index.json"
    if (overrideUrl != null) fetchUrl = overrideUrl;

    let response = await fetch(fetchUrl);
    if (response.ok == false) throw new Error(`Failed to fetch data at ${fetchUrl}, received status code ${response.status}.`);

    let data = await response.json();

    return data;
}

export default { fetchDataAsync };