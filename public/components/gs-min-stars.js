/**
 * gs-min-stars
 *
 * This Web Component renders a select input, where the user can
 * choose to show repositories with a minimum amount of stars.
 */
export class MinStars extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		this.render();
	}

	/**
	 * Render the component HTML in its Shadow DOM
	 */
	render() {
		this.shadowRoot.innerHTML = `
			<label for="stars">Minimum stars</label>

			<select name="stars" id="stars">
				<option value="">Any amount</option>
				<option value="10">${(10).toLocaleString()}</option>
				<option value="100">${(100).toLocaleString()}</option>
				<option value="1000">${(1000).toLocaleString()}</option>
				<option value="10000">${(10000).toLocaleString()}</option>
				<option value="50000">${(50000).toLocaleString()}</option>
				<option value="100000">${(100000).toLocaleString()}</option>
			</select>
		`;
	}
}
