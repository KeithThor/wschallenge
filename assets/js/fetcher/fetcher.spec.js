import fetcher from "./fetcher";

describe("fetchDataAsync from fetcher", () => {
    const testDataUrl = "assets/js/fetcher/test-data.json";

    it("should reject if provided invalid url.", async () => {
        let url = "/asdasd/file-doesnt-exist.txt";

        expectAsync(fetcher.fetchDataAsync(url)).toBeRejected();
    });

    it("should resolve if provided valid url.", async () => {
        expectAsync(fetcher.fetchDataAsync(testDataUrl)).toBeResolvedTo();
    });

    it("should produce an object with same properties as json.", async () => {
        expectAsync(fetcher.fetchDataAsync(testDataUrl)).toBeResolvedTo({
            "text": "testdata"
        });
    });
});