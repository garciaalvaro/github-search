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

		this.addEventListener("click", e => {
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

			const $buttons = this.querySelectorAll("button");

			// Update .is-active class and remove it from the previous one
			[...$buttons].forEach($button => {
				if ($button.dataset.language === language) {
					$button.classList.toggle("is-active");
				} else {
					$button.classList.remove("is-active");
				}
			});
		});

		this.render();
	}

	/**
	 * Render the component HTML
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

		this.innerHTML = `
			<div class="container container--content-fluid">
				${languages}
			</div>
		`;
	}
}
