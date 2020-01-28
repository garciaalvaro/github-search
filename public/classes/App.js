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

		this.keywords = "";
		this.language = "";

		this.registerEventListeners();
		this.render();
	}

	/**
	 * Register the event listeners from the children components
	 */
	registerEventListeners() {
		// From gs-keywords component
		this.$root.addEventListener("keywordsUpdated", e => {
			this.keywords = e.detail;
		});

		// From gs-languages component
		this.$root.addEventListener("languageUpdated", e => {
			this.language = e.detail;
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
