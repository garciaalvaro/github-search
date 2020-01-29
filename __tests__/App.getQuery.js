import { App } from "../public/classes/App.js";
import "@skatejs/ssr/register";

describe("App class", () => {
	beforeAll(() => {
		// Set up the initial content
		document.body.innerHTML = `<div id="root"></div>`;
	});

	test("getQuery method", () => {
		// Instantiate the class
		const app = new App();
		const base = "https://api.github.com/search/repositories?q=";

		app.today = new Date(2020, 0, 20);

		// keywords

		app.keywords = "Some=Text";

		expect(app.getQuery()).toBe(base + "Some%3DText");

		app.keywords = "Some Text";

		expect(app.getQuery()).toBe(base + "Some+Text");

		// language

		app.language = "TypeScript";

		expect(app.getQuery()).toBe(base + "Some+Text+language:TypeScript");

		app.language = "C#";

		expect(app.getQuery()).toBe(base + "Some+Text+language:C%23");

		app.language = "";

		expect(app.getQuery()).toBe(base + "Some+Text");

		// last_update

		app.last_update = "last_week";

		expect(app.getQuery()).toBe(base + "Some+Text+pushed:>2020-01-13");

		app.last_update = "last_month";

		expect(app.getQuery()).toBe(base + "Some+Text+pushed:>2019-12-20");

		app.last_update = "last_year";

		expect(app.getQuery()).toBe(base + "Some+Text+pushed:>2019-01-20");

		app.last_update = "last_2_years";

		expect(app.getQuery()).toBe(base + "Some+Text+pushed:>2018-01-20");

		app.last_update = "last_3_years";

		expect(app.getQuery()).toBe(base + "Some+Text+pushed:>2017-01-20");

		app.last_update = "";

		expect(app.getQuery()).toBe(base + "Some+Text");

		// min_stars

		app.min_stars = "10";

		expect(app.getQuery()).toBe(base + "Some+Text+stars:>10");

		app.min_stars = "100";

		expect(app.getQuery()).toBe(base + "Some+Text+stars:>100");

		app.min_stars = "1000";

		expect(app.getQuery()).toBe(base + "Some+Text+stars:>1000");

		app.min_stars = "10000";

		expect(app.getQuery()).toBe(base + "Some+Text+stars:>10000");

		app.min_stars = "50000";

		expect(app.getQuery()).toBe(base + "Some+Text+stars:>50000");

		app.min_stars = "100000";

		expect(app.getQuery()).toBe(base + "Some+Text+stars:>100000");

		app.min_stars = "";

		expect(app.getQuery()).toBe(base + "Some+Text");

		// page

		app.page = 0;

		expect(app.getQuery()).toBe(base + "Some+Text");

		app.page = 1;

		expect(app.getQuery()).toBe(base + "Some+Text");

		app.page = 2;

		expect(app.getQuery()).toBe(base + "Some+Text&page=2");

		app.page = 9999;

		expect(app.getQuery()).toBe(base + "Some+Text&page=9999");
	});
});
