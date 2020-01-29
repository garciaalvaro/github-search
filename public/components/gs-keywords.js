import { icon_search } from "../utils/icons.js";

/**
 * gs-keywords
 *
 * This Web Component renders the main search field
 * where the user can enter the main keywords.
 */
export class Keywords extends HTMLElement {
	constructor() {
		super();

		// When the input changes, we dispatch an event with the new value
		this.addEventListener("input", e => {
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
	 * Render the component HTML
	 */
	render() {
		this.innerHTML = `
			<div class="container search search--big">

				<label
					for="input"
					class="search__label"
				>Search</label>

				<input
					id="input"
					class="search__input"
					type="text"
					placeholder="Search repositories..."
				/>

				<button
					class="search__button btn btn--icon"
				>${icon_search}</button>

			</div>
		`;
	}
}
