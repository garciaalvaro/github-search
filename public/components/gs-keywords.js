import { icon_search } from "/utils/icons.js";

/**
 * gs-keywords
 *
 * This Web Component renders the main search field
 * where the user can enter the main keywords.
 */
export class Keywords extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		// When the input changes, we dispatch an event with the new value
		this.shadowRoot.addEventListener("input", e => {
			this.dispatchEvent(
				new CustomEvent("filterUpdated", {
					bubbles: true,
					detail: { value: e.target.value, prop_name: "keywords" }
				})
			);
		});

		this.render();
	}

	/**
	 * Render the component HTML in its Shadow DOM
	 */
	render() {
		this.shadowRoot.innerHTML = `
			<label for="input">Search</label>

			<input
				id="input"
				type="text"
				placeholder="Search repositories..."
			/>

			<button>${icon_search}</button>
		`;
	}
}
