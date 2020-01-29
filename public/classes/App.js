import { prepareItems } from "/utils/prepareItems.js";
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
		this.$root = document.querySelector("#root");
		this.today = new Date();
		this.timeout = null;
		this.fetch_id = 0;

		this.keywords = "";
		this.language = "";
		this.last_update = "";
		this.min_stars = "";
		this.page = 1;

		this.registerEventListeners();
		this.render();

		this.$chars_left = document.querySelector("#chars-left");
		this.$loading = document.querySelector("#loading");
		this.$no_results = document.querySelector("#no-results");
		this.$items_found = document.querySelector("#items-found");
		this.$too_many_requests = document.querySelector("#too-many-requests");
		this.$results = document.querySelector("#results");
		this.$pagination = document.querySelector("#pagination");
	}

	/**
	 * Handle user updates and throttle the call to fetch data
	 */
	updateResults(time = 1000) {
		// If the timeout is running reset it
		if (this.timeout) {
			clearTimeout(this.timeout);
		}

		this.$loading.setAttribute("text", "Waiting...");
		this.$no_results.setAttribute("text", "");
		this.$items_found.setAttribute("text", "");
		this.$too_many_requests.setAttribute("text", "");
		this.$results.updateItems([]);

		// If keywords has less than 3 characters do not continue
		if (this.keywords.length < 3) {
			this.$loading.setAttribute("text", "");

			return;
		}

		this.fetch_id++;
		const fetch_id_used = this.fetch_id;

		// Set a throttle so the callback is not called before the
		// given time.
		this.timeout = setTimeout(async () => {
			this.timeout = null;

			this.$loading.setAttribute("text", "Loading...");

			const { data, too_many_requests } = await this.fetchData();

			// If the id is not the latest one, return. This could happen
			// if a new timeout was triggered before this fetch resolved.
			if (this.fetch_id !== fetch_id_used) return;

			this.$loading.setAttribute("text", "");

			if (too_many_requests) {
				this.$too_many_requests.setAttribute(
					"text",
					"It looks like too many requests were made. Please try again in a minute."
				);
			}

			if (!data) {
				this.$results.updateItems([]);

				return;
			}

			const { items, total_count } = data;

			if (total_count === 0) {
				this.$no_results.setAttribute("text", "No results");
			} else {
				this.$items_found.setAttribute(
					"text",
					`${total_count.toLocaleString()} repositor${
						total_count > 1 ? "ies" : "y"
					} found`
				);
			}

			const items_prepared = prepareItems(items);

			this.$results.updateItems(items_prepared);

			this.$pagination.setAttribute("items_found", total_count);
		}, time);
	}

	/**
	 * Fetch the data
	 */
	async fetchData() {
		const url = this.getQuery();

		// Fetch the data
		const response = await fetch(url);

		if (!response.ok) {
			return {
				data: null,
				too_many_requests: response.status === 403
			};
		}

		const data = await response.json();

		return { data, too_many_requests: false };
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
			this.page > 1 ? `&page=${encode(this.page)}` : ""
		].join("");
	}

	/**
	 * Register the event listeners from the children components
	 */
	registerEventListeners() {
		this.$root.addEventListener("pageUpdated", e => {
			this.page = e.detail;

			// When updating from the pagination buttons,
			// we don't need to throttle.
			this.updateResults(0);
		});

		this.$root.addEventListener("filterUpdated", e => {
			const { value, prop_name } = e.detail;

			this[prop_name] = value;

			this.page = 1;
			this.$pagination.setAttribute("page", 1);
			this.$pagination.setAttribute("items_found", 0);

			this.updateResults();

			if (prop_name === "keywords") {
				let message = "";

				switch (value.length) {
					case 0:
						message = "Enter some text in the search field above";
						break;

					case 1:
						message = "Enter 2 more characters";
						break;

					case 2:
						message = "Enter 1 more character";
						break;
				}

				this.$chars_left.setAttribute("text", message);
			}
		});
	}

	/**
	 * Render the component HTML in its Shadow DOM
	 */
	render() {
		this.$root.innerHTML = `
			<main id="content">
				<div id="container-search">
					<gs-keywords></gs-keywords>
				</div>

				<div id="container-filters">
					<gs-last-update></gs-last-update>

					<gs-min-stars></gs-min-stars>

					<gs-languages></gs-languages>
				</div>

				<div id="container-status">
					<gs-message
						id="chars-left"
						text="Enter some text in the search field above."
					></gs-message>

					<gs-message id="loading"></gs-message>

					<gs-message id="no-results"></gs-message>

					<gs-message id="too-many-requests"></gs-message>
				</div>

				<div id="container-results">
					<gs-message
						id="items-found"
						tag="H3"
					></gs-message>

					<gs-results id="results"></gs-results>

					<gs-pagination
						id="pagination"
						page="1"
						items_found="0"
					></gs-results>
				</div>
			</main>
		`;
	}
}
