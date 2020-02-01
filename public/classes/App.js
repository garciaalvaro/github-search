import { prepareItems } from "../utils/prepareItems.js";
import { encode } from "../utils/encode.js";
import { getPrevDateFrom } from "../utils/getPrevDateFrom.js";

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
		this.fetch_id = 0;

		this.keywords = "";
		this.language = "";
		this.last_update = "";
		this.min_stars = "";
		this.page = 1;

		this.registerEventListeners();
		this.render();

		this.$status = document.getElementById("status");
		this.$items_found = document.getElementById("items-found");
		this.$results = document.getElementById("results");
		this.$pagination = document.getElementById("pagination");
	}

	/**
	 * Utility to update the "text" attribute of a given element
	 */
	updateText($element, text = "") {
		if (!$element) return;

		$element.setAttribute("text", text);
	}

	/**
	 * Update the current status messages
	 */
	updateStatus(status = "", payload = null) {
		switch (status) {
			case "THROTTLE_PREPARE":
				this.updateText(this.$status);
				this.updateText(this.$items_found);

				break;

			case "THROTTLE":
				this.updateText(this.$status, "Waiting...");

				break;

			case "FETCH":
				this.updateText(this.$status, "Loading...");

				break;

			case "FETCH_FAILED":
				this.updateText(
					this.$status,
					"It looks like there was an error getting the data. " +
						"Please try again in some time."
				);

				break;

			case "FETCH_FORBIDDEN":
				this.updateText(
					this.$status,
					"It looks like too many requests were made. " +
						"Please try again in a minute."
				);

				break;

			case "NOT_ENOUGH_CHARACTERS":
				this.updateText(
					this.$status,
					payload === 0
						? "Enter some text in the search field above"
						: payload === 1
						? "Enter 2 more characters"
						: "Enter 1 more character"
				);

				break;

			case "UPDATE_RESULTS":
				if (payload) {
					this.updateText(this.$status);
					this.updateText(
						this.$items_found,
						`${payload.toLocaleString()} repositor${
							payload > 1 ? "ies" : "y"
						} found`
					);
				} else {
					this.updateText(this.$status, "No results");
				}

				break;
		}
	}

	/**
	 * Handle user updates and throttle the call to fetch data
	 */
	updateResults(time = 1000) {
		// If the timeout is running reset it
		clearTimeout(this.timeout);

		this.$results.items = [];

		this.$pagination.setAttribute("items_found", 0);

		this.updateStatus("THROTTLE_PREPARE");

		// If keywords has less than 3 characters do not continue
		if (this.keywords.length < 3) return;

		this.updateStatus("THROTTLE");

		this.fetch_id++;
		const fetch_id_used = this.fetch_id;

		// Set a throttle so the callback is not called before the given time.
		this.timeout = setTimeout(async () => {
			this.timeout = null;

			this.updateStatus("FETCH");

			const { data, too_many_requests } = await this.fetchData();

			// If the id is not the latest one, return. This could happen
			// if a new timeout was triggered before this fetch resolved.
			if (this.fetch_id !== fetch_id_used) return;

			if (too_many_requests) {
				this.updateStatus("FETCH_FORBIDDEN");

				return;
			}

			if (!data) {
				this.updateStatus("FETCH_FAILED");

				return;
			}

			const { items, total_count } = data;

			if (total_count > 0) {
				this.updateStatus("UPDATE_RESULTS", total_count);

				this.$results.items = prepareItems(items);

				this.$pagination.setAttribute("items_found", total_count);

				return;
			}

			this.updateStatus("UPDATE_RESULTS", total_count);
		}, time);
	}

	/**
	 * Fetch the data
	 */
	async fetchData() {
		const url = this.getQuery();

		// Fetch the data
		const response = await fetch(url).catch(error =>
			this.updateStatus("FETCH_FAILED")
		);

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

			this.updateResults();

			if (prop_name === "keywords" && value.length < 3) {
				this.updateStatus("NOT_ENOUGH_CHARACTERS", value.length);
			}
		});
	}

	/**
	 * Render the component HTML
	 */
	render() {
		this.$root.innerHTML = `
			<main id="content">
				<h1
					id="title"
					class="theme-dark"
				>
					<a
						href="https://github.com/garciaalvaro/github-search"
					>GitHub Search</a>
				</h1>

				<div
					id="container-search"
					class="container container--content-centered theme-dark"
				>
					<gs-keywords></gs-keywords>
				</div>

				<div
					id="container-filters"
					class="container container--content-fluid"
				>
					<gs-last-update
						class="column column--width-25"
					></gs-last-update>

					<gs-min-stars
						class="column column--width-25"
					></gs-min-stars>

					<gs-languages
						id="languages"
						class="column column--width-50"
					></gs-languages>
				</div>

				<div
					id="container-status"
					class="container"
				>
					<gs-message
						id="status"
						text="Enter some text in the search field above."
					></gs-message>
				</div>

				<div
					id="container-results"
					class="container container--content-column"
				>
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
