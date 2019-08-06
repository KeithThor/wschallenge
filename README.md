# [Williams-Sonoma Challenge](https://keiththor.github.io/wschallenge/)

This is an assignment to display a list of furniture items loaded from a json file. The site is mobile-responsive and handicap-accessible.

# About the Infrastructure

The index.html page will load up and call the async function in app.js that will proceed to load the data from the provided json file. If the file was successfully found, it's contents will be converted into json and handed over to the display-builder to begin constructing all the html elements required to display the data. The display-builder will call the make function from the component-factory which will use its helper functions to construct each piece of the furniture's display elements. All of the dynamically built elements are built and attached to a documentFragment object, which will reduce the amount of processing needed as compared to placing them straight into the DOM. This is because adding each element through the document object will redetermine the document's layout for each element addition, but with a documentFragment, the layout is only redetermined when the documentFragment is added to the DOM.

As to how the carousel works, every furniture piece's hero img has a click handler that is registered with that given furniture's context data. Clicking on the hero img will call the make function in the carousel-factory that creates a carousel component. That component is attached to the div with the "carousel" id. Exiting the carousel component will remove the created carousel component from memory; every subsequent click to a hero img will create a new carousel component.

Almost every function for every file is exported, although only essential functions are exported as default. This is to allow easy unit testing of those "private" functions that need testing.

## Installation

Before installing the project, you must have [Node](https://nodejs.org/en/download/) installed. A code editor of your choice is also recommended to be installed but not required.

1. Clone or download the source files above. Extract the files if necessary.

2. Open Node and navigate to the root of the project folder. (You should see package.json)

3. Type and execute the following:
```bash
npm install
```

4. Afterwards, you should have a working installation of the project.

## Commands

To build the project for distribution, type and execute the following code:
```bash
npm run build
```

To run a live local server that performs hot swapping, type and execute the following code:
```bash
npm run serve
```

To run the unit tests, type and execute the following code:
```bash
npm run test
```
