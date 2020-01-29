import { App } from "../public/classes/App.js";
import "@skatejs/ssr/register";

describe("App class", () => {
	beforeAll(() => {
		// Set up the initial content
		document.body.innerHTML = `<div id="root"></div>`;
	});

	test("updateStatus method", async () => {
		// Instantiate the class
		const app = new App();

		app.updateStatus("THROTTLE_PREPARE");

		expect(app.$loading.getAttribute("text")).toBe("");

		app.updateStatus("THROTTLE");

		expect(app.$loading.getAttribute("text")).toBe("Waiting...");

		app.updateStatus("FETCH_FAILED");

		expect(app.$loading.getAttribute("text")).toBe("");

		app.updateStatus("FETCH_FORBIDDEN");

		expect(app.$error.getAttribute("text")).toBe(
			"It looks like too many requests were made. " +
				"Please try again in a minute."
		);

		app.updateStatus("UPDATE_CHARACTERS", 0);

		expect(app.$chars_left.getAttribute("text")).toBe(
			"Enter some text in the search field above"
		);

		app.updateStatus("UPDATE_CHARACTERS", 1);

		expect(app.$chars_left.getAttribute("text")).toBe(
			"Enter 2 more characters"
		);

		app.updateStatus("UPDATE_CHARACTERS", 2);

		expect(app.$chars_left.getAttribute("text")).toBe(
			"Enter 1 more character"
		);
	});
});
