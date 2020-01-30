import { App } from "../public/classes/App.js";
import "@skatejs/ssr/register";

describe("App class", () => {
	beforeAll(() => {
		// Set up the initial content
		document.body.innerHTML = `<div id="root"></div>`;
	});

	test("updateText method", () => {
		// Instantiate the class
		const app = new App();

		app.updateText(app.$status, "Some Text");

		expect(app.$status.getAttribute("text")).toBe("Some Text");

		app.updateText(app.$status, "");

		expect(app.$status.getAttribute("text")).toBe("");
	});
});
