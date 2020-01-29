import { App } from "../public/classes/App.js";
import "@skatejs/ssr/register";

describe("App class", () => {
	beforeAll(() => {
		// Set up the initial content
		document.body.innerHTML = `<div id="root"></div>`;
	});

	test("after the initial render the page HTML changed", () => {
		// Instantiate the class
		new App();

		expect(document.body.innerHTML).not.toBe(`<div id="root"></div>`);
	});
});
