/**
 * gs-results
 *
 * This Web Component renders a list of gs-result.
 */
export class Results extends HTMLElement {
	constructor() {
		super();

		this.items = [];

		this.attachShadow({ mode: "open" });

		this.render();
	}

	/**
	 * Render the component HTML in its Shadow DOM
	 */
	render() {
		if (!this.items.length) {
			this.shadowRoot.innerHTML = "";

			return;
		}

		const html_list = this.items
			.map(
				({
					name,
					url,
					description,
					user,
					stars,
					language,
					updated,
					license
				}) => `
					<li>
						<gs-result
							name="${name}"
							url="${url}"
							description="${description}"
							user="${user}"
							stars="${stars}"
							language="${language}"
							updated="${updated}"
							license="${license}"
						></gs-result>
					</li>
				`
			)
			.join("");

		this.shadowRoot.innerHTML = `
			<ul>
				${html_list}
			</ul>
		`;
	}
}
