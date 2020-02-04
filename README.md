![Banner Image](docs/banner.png)

# GitHub Search

This project is a simple app that provides a UI to search GitHub repositories using the [GitHub Search API](https://developer.github.com/v3/search/).

The goal was to build it in a simple way. The project uses vanilla JavaScript and CSS. It is built for modern browsers and it makes use of APIs/features which are already available, such as Web Components, JavaScript modules and ES6. For these reasons it can be run as is, without a previous bundling step.

- **Vanilla JavaScript** (ES6) and CSS
- Uses JavaScript modules
- Uses **Web Components**
- It provides a server using **Node.js** and **Express** on port 3000
- It provides configuration files for **eslint** linter
- Tests are included using **Jest**

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

## Testing

To run the provided tests, simply run: `$ npm test`

## Docker

The project also comes with Docker configuration files, so it can be run using Docker.
 - First make sure you have Docker installed.
 - Run the command: `$ docker-compose up -d` which will download and install the dependencies and set up the container
 - Once finished, it will be available in http://localhost:3000

## Screenshots

![Screenshot Image](docs/screenshot.png)

---

## Changelog

#### 1.1.0

- Added Docker configuration files. Now the project can be run using Docker.

#### 1.0.3

- Improved styles
- Fixed nav and h4 HTML tags not being closed correctly
- Hide #pagination while waiting and loading data

#### 1.0.2

- Added favicon
- Added license file

#### 1.0.1

- Added base tag in index.html so any route will point to the same path
- Cleaned white spaces in some css files

#### 1.0.0

- Minor styling fixes
- Several code fixes and improvements
- Added tests with Jest
- Added project description and instructions

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
