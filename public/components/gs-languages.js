/**
 * gs-languages
 *
 * This Web Component renders a list of buttons with the
 * available languages that the user can choose from.
 */
export class Languages extends HTMLElement {
	constructor() {
		super();

		this._languages = [
			"JavaScript",
			"TypeScript",
			"HTML",
			"CSS",
			"Objective-C",
			"Java",
			"Ruby",
			"Python",
			"PHP",
			"C#"
		];

		this.attachShadow({ mode: "open" });

		// When a button is clicked, we dispatch an event with its value
		this.shadowRoot.addEventListener("click", e => {
			this.dispatchEvent(
				new CustomEvent("languageUpdated", {
					bubbles: true,
					detail: e.target.dataset.language
				})
			);
		});

		this.render();
	}

	/**
	 * Render the component HTML in its Shadow DOM
	 */
	render() {
		this.shadowRoot.innerHTML = this._languages
			.map(
				language => `
					<button
						data-language="${language}"
					>${language}</button>
				`
			)
			.join("");
	}
}
