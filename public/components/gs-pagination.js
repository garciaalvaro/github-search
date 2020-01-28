/**
 * gs-pagination
 *
 * This Web Component renders a simple pagination.
 */
export class Pagination extends HTMLElement {
	/**
	 * Indicate which attributes should trigger attributeChangedCallback
	 */
	static get observedAttributes() {
		return ["page", "items_found"];
	}

	constructor() {
		super();

		this.items_per_page = 30;

		this.attachShadow({ mode: "open" });

		// When the input changes, we dispatch an event with the new value
		this.shadowRoot.addEventListener("click", e => {
			const { id } = e.target;

			if (id !== "prev" && id !== "next") return;

			const page = parseInt(this.getAttribute("page"));
			const page_updated = id === "prev" ? page - 1 : page + 1;

			this.dispatchEvent(
				new CustomEvent("pageUpdated", {
					bubbles: true,
					detail: page_updated
				})
			);

			this.setAttribute("page", page_updated);

			this.render();
		});

		this.render();
	}

	/**
	 * When the observed attributes change, call render
	 */
	attributeChangedCallback() {
		this.render();
	}

	/**
	 * Render the component HTML in its Shadow DOM
	 */
	render() {
		const page = parseInt(this.getAttribute("page"));
		const items_found = parseInt(this.getAttribute("items_found"));
		const prev_disabled = page === 1;
		const next_disabled = items_found <= page * this.items_per_page;

		if (items_found === 0) {
			this.shadowRoot.innerHTML = "";

			return;
		}

		this.shadowRoot.innerHTML = `
			<nav>
				<span>Page ${page}</span>

				<button
					id="prev"
					${prev_disabled ? "disabled" : ""}
				>Prev</button>

				<button
					id="next"
					${next_disabled ? "disabled" : ""}
				>Next</button>
			<nav>
		`;
	}
}
