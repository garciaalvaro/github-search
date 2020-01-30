![Banner Image](docs/banner.png)

# GitHub Search

This project is a simple app that provides a UI to search GitHub repositories using the [GitHub Search API](https://developer.github.com/v3/search/).

The goal was to build it in a simple way. The project uses vanilla JavaScript and CSS. It is built for modern browsers and it makes use of APIs/features which are already available, such as Web Components, JavaScript modules and ES6. For this reason it can be run as is, without a previous bundling step.

- **Vanilla JavaScript** (ES6) and CSS
- Uses JavaScript modules
- Uses **Web Components**
- It provides a server using **Node.js** and **Express** on port 3000
- It provides configuration files for **eslint** linter
- Tests are included using **Jest**

---

## Getting Started

### Prerequisites

To run this project make sure you have installed Node.js and npm in your machine.

### Installing and running

Install the project dependencies and start the server. From the root directory inside your terminal follow this steps:

- Install the dependencies: `$ npm install`
- Once finished, start the server: `$ npm start`
- Visit http://localhost:3000 in your browser

### Notes

- To stop the server run: `$ npm stop`
- You may also run the server in development mode: `$ npm run server:dev`

### Testing

- To run the provided tests, simply run: `$ npm test`

## Screenshots

![Screenshot Image](docs/screenshot.png)

---

## Changelog

#### 0.3.0

- Added styling to the page and components
- Switched components shadow DOM to light DOM, to facilitate the use of shared styles
- Added BEM approach to element CSS classes
- Improved HTML layout and semantics

#### 0.2.0

- Completed the functionality to fetch and render the data
- Added classes and web components

#### 0.1.0

- Added an express server that listens on port 3000
- Added the basic project structure
- Added eslint linter
