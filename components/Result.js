import { sanitize } from "../utils/sanitize.js";
import { icon_star } from "../utils/icons.js";

/**
 * gs-result
 *
 * This Web Component renders the main information of a repository.
 */
export class Result extends HTMLElement {
	constructor() {
		super();

		this.render();
	}

	/**
	 * Render the component HTML
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

		this.innerHTML = `
			<article class="item">
				<header>
					<h4>
						<a
							href="${url}"
							class="item__link"
						>${user} / ${name}</a>
					</h4>
				</header>

				<section
					class="item__body"
				>
					<p>${description}</p>
				</section>

				<footer class="item__footer container container--content-fluid">
					<div class="item__stars">
						${icon_star}

						<span>${stars}</span>
					</div>

					<span class="item__language">${language}</span>

					<span class="item__license">${license}</span>

					<span class="item__updated">${updated}</span>

				</footer>
			</article>
		`;
	}
}
