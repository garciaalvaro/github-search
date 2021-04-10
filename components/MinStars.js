/**
 * gs-min-stars
 *
 * This Web Component renders a select input, where the user can
 * choose to show repositories with a minimum amount of stars.
 */
export class MinStars extends HTMLElement {
	constructor() {
		super();

		// When the select changes, we dispatch an event with the new value
		this.addEventListener("input", e => {
			this.dispatchEvent(
				new CustomEvent("filterUpdated", {
					bubbles: true,
					detail: { value: e.target.value, prop_name: "min_stars" },
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
			<div class="container container--content-column">
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
			</div>
		`;
	}
}
