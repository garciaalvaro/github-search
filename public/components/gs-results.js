/**
 * gs-results
 *
 * This Web Component renders a list of gs-result.
 */
export class Results extends HTMLElement {
	constructor() {
		super();

		this.items = [];

		this.render();
	}

	/**
	 * Update the items prop and render
	 */
	updateItems(items = []) {
		this.items = items;

		this.render();
	}

	/**
	 * Render the component HTML
	 */
	render() {
		if (!this.items.length) {
			this.innerHTML = "";

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

		this.innerHTML = `
			<ul class="list">
				${html_list}
			</ul>
		`;
	}
}
