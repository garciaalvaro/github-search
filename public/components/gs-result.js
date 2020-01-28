import { sanitize } from "/utils/sanitize.js";
import { icon_star } from "/utils/icons.js";

/**
 * gs-result
 *
 * This Web Component renders the main information of a repository.
 */
export class Result extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		this.render();
	}

	/**
	 * Render the component HTML in its Shadow DOM
	 */
	render() {
		const name = sanitize(this.getAttribute("name"));
		const url = sanitize(this.getAttribute("url"));
		const description = sanitize(this.getAttribute("description"));
		const user = sanitize(this.getAttribute("user"));
		const stars = sanitize(this.getAttribute("stars"));
		const language = sanitize(this.getAttribute("language"));
		const updated = sanitize(this.getAttribute("updated"));
		const license = sanitize(this.getAttribute("license"));

		this.shadowRoot.innerHTML = `
			<article>
				<header>
					<h4>
						<a href="${url}"
						>${user} / ${name}</a>
					<h4>
				</header>

				<section>
					<p>${description}</p>
				</section>

				<footer>
					<div class="stars">
						${icon_star}

						<span>${stars}</span>
					</div>

					<span class="language">${language}</span>

					<span class="license">${license}</span>

					<span class="updated">${updated}</span>

				</footer>
			</article>
		`;
	}
}
