import { App } from "../public/classes/App.js";
import "@skatejs/ssr/register";

describe("App class", () => {
	beforeAll(() => {
		// Set up the initial content
		document.body.innerHTML = `<div id="root"></div>`;
	});

	test("updateStatus method", () => {
		// Instantiate the class
		const app = new App();

		app.updateStatus("THROTTLE_PREPARE");

		expect(app.$status.getAttribute("text")).toBe("");

		app.updateStatus("THROTTLE");

		expect(app.$status.getAttribute("text")).toBe("Waiting...");

		app.updateStatus("FETCH_FAILED");

		expect(app.$status.getAttribute("text")).toBe(
			"It looks like there was an error getting the data. " +
				"Please try again in some time."
		);

		app.updateStatus("FETCH_FORBIDDEN");

		expect(app.$status.getAttribute("text")).toBe(
			"It looks like too many requests were made. " +
				"Please try again in a minute."
		);

		app.updateStatus("NOT_ENOUGH_CHARACTERS", 0);

		expect(app.$status.getAttribute("text")).toBe(
			"Enter some text in the search field above"
		);

		app.updateStatus("NOT_ENOUGH_CHARACTERS", 1);

		expect(app.$status.getAttribute("text")).toBe(
			"Enter 2 more characters"
		);

		app.updateStatus("NOT_ENOUGH_CHARACTERS", 2);

		expect(app.$status.getAttribute("text")).toBe("Enter 1 more character");
	});
});
