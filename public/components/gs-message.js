import { sanitize } from "/utils/sanitize.js";

/**
 * gs-message
 *
 * This Web Component renders a message.
 */
export class Message extends HTMLElement {
	/**
	 * Indicate which attributes should trigger attributeChangedCallback
	 */
	static get observedAttributes() {
		return ["text"];
	}

	constructor() {
		super();

		this.render();
	}

	/**
	 * When the observed attributes change, call render
	 */
	attributeChangedCallback() {
		this.render();
	}

	/**
	 * Get the HTML to render.
	 * This function is a simple helper, to make the logic cleaner.
	 */
	getHtml(tag, text) {
		// Sanitize the text
		text = sanitize(text);

		if (!text) return "";

		switch (tag) {
			case "H1":
				return `<h1>${text}</h1>`;
			case "H2":
				return `<h2>${text}</h2>`;
			case "H3":
				return `<h3>${text}</h3>`;
			case "H4":
				return `<h4>${text}</h4>`;
			case "SPAN":
				return `<span>${text}</span>`;
			default:
				return `<p>${text}</p>`;
		}
	}

	/**
	 * Render the component HTML
	 */
	render() {
		const text = this.getAttribute("text") || "";
		const tag = this.getAttribute("tag") || "";

		this.innerHTML = this.getHtml(tag, text);
	}
}
