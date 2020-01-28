import { encode } from "/utils/encode.js";
import { getPrevDateFrom } from "/utils/getPrevDateFrom.js";

/**
 * App
 *
 * This class handles the render of the HTML at the root level.
 * It manages the app state and sends the data to the different
 * Web Components
 */
export class App {
	constructor() {
		this.$root = document.getElementById("root");
		this.today = new Date();
		this.timeout = null;

		this.keywords = "";
		this.language = "";
		this.last_update = "";
		this.min_stars = "";
		this.page = 1;

		this.registerEventListeners();
		this.render();
	}

	/**
	 * Handle user updates and throttle the call to fetch data
	 */
	updateResults(time = 1000) {
		// If the timeout is running reset it
		if (this.timeout) {
			clearTimeout(this.timeout);
		}

		// If keywords has less than 3 characters do not continue
		if (this.keywords.length < 3) return;

		// Set a throttle so the callback is not called before the
		// given time.
		this.timeout = setTimeout(() => {
			this.timeout = null;
		}, time);
	}

	/**
	 * Generate a query to be used to fetch data from the GitHub API
	 */
	getQuery() {
		return [
			// Base
			"https://api.github.com/search/repositories?q=",

			// Keywords
			encode(this.keywords),

			// Language
			this.language ? `+language:${encode(this.language)}` : "",

			// Last Update
			this.last_update
				? `+pushed:>${encode(
						getPrevDateFrom(this.last_update, this.today)
				  )}`
				: "",

			// Stars
			this.min_stars ? `+stars:>${encode(this.min_stars)}` : "",

			// Page
			this.page > 1 ? `&page=${encode(page)}` : ""
		].join("");
	}

	/**
	 * Register the event listeners from the children components
	 */
	registerEventListeners() {
		// From gs-keywords component
		this.$root.addEventListener("keywordsUpdated", e => {
			this.keywords = e.detail;
			this.updateResults();
		});

		// From gs-languages component
		this.$root.addEventListener("languageUpdated", e => {
			this.language = e.detail;
			this.updateResults();
		});

		// From gs-last-update component
		this.$root.addEventListener("lastUpdateUpdated", e => {
			this.last_update = e.detail;
			this.updateResults();
		});

		// From gs-min-stars component
		this.$root.addEventListener("minStarsUpdated", e => {
			this.min_stars = e.detail;
			this.updateResults();
		});
	}

	/**
	 * Render the component HTML in its Shadow DOM
	 */
	render() {
		this.$root.innerHTML = `
			<main id="content">
				<gs-keywords></gs-keywords>

				<gs-last-update></gs-last-update>

				<gs-min-stars></gs-min-stars>

				<gs-languages></gs-languages>

				<gs-message
					text="Enter some text in the search field above."
					tag="P"
				></gs-message>

				<gs-results></gs-results>
			</main>
		`;
	}
}
