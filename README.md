![Banner Image](docs/banner.png)

# GitHub Search

[Demo](https://garciaalvaro.github.io/github-search)

This project is a simple app that provides a UI to search GitHub repositories using the [GitHub Search API](https://developer.github.com/v3/search/).

The goal was to build it in a simple way. The project uses vanilla JavaScript and CSS. It is built for modern browsers and it makes use of APIs/features which are already available, such as Web Components, ES modules and ES6. For these reasons it can be run as is, without a previous bundling step.

- **Vanilla JavaScript** (ES6) and CSS
- Uses ES modules
- Uses **Web Components**
- Provides a server using **Node.js** and **Express** on port 3000
- Provides configuration files for **eslint** linter
- Includes tests using **Jest**

To see a reimplementation of this project built in TypeScript using React and Redux, please check [GitHub Search (React)](https://github.com/garciaalvaro/github-search-react).

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

---

## Testing

To run the provided tests, simply run: `$ npm test`

---

## Docker

The project also comes with Docker configuration files, so it can be run using Docker.
 - First make sure you have Docker installed
 - Run the command: `$ npm run docker` which will download and install the dependencies and set up the container
 - Once finished, it will be available in http://localhost:3000
 - To stop the container run the command: `$ npm run docker-stop`

---

## Screenshots

![Screenshot Image](docs/screenshot.png)
