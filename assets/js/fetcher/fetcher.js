/**Fetches the Williams-Sonoma data asynchronously. */
const fetchDataAsync = async () => {
    let response = await fetch("./dist/index.json");
    
    let data = await response.json();

    return data;
}

export default { fetchDataAsync };