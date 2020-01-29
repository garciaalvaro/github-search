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

		this.shadowRoot.addEventListener("click", e => {
			const { language } = e.target.dataset;

			if (!language) return;

			// When a button is clicked, we dispatch an event with its value
			this.dispatchEvent(
				new CustomEvent("filterUpdated", {
					bubbles: true,
					detail: {
						value: language,
						prop_name: "language"
					}
				})
			);
		});

		this.render();
	}

	/**
	 * Render the component HTML in its Shadow DOM
	 */
	render() {
		const languages = this._languages
			.map(
				language => `
					<button
						data-language="${language}"
					>${language}</button>
				`
			)
			.join("");

		this.shadowRoot.innerHTML =
			`
			<style>
				button,
				button:focus,
				button:hover
				{
					background: none;
					box-shadow: none;
					border: none;
					color: inherit;
					letter-spacing: inherit;
				}

				button
				{
					cursor: pointer;
					padding: .4em .5em;
					font-size: .95em;
					position: relative;
				}

				button:before
				{
					content: "";
					height: .3em;
					position: absolute;
					left: .5em;
					right: .5em;
					bottom: .2em;
					background-color: var(--accent_color_07);
					transform: scaleY(0);
					transform-origin: bottom;
					transition: transform .15s ease, opacity .15s;
					opacity: 0;
				}

				button:hover:before,
				button.is-active:before
				{
					transform: scaleY(1);
					opacity: 1;
				}
			</style>
		` + languages;
	}
}
