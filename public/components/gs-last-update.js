/**
 * gs-last-update
 *
 * This Web Component renders a select input, where the user can
 * choose a period of time when the repositories were updated.
 */
export class LastUpdate extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		// When the select changes, we dispatch an event with the new value
		this.shadowRoot.addEventListener("input", e => {
			this.dispatchEvent(
				new CustomEvent("filterUpdated", {
					bubbles: true,
					detail: { value: e.target.value, prop_name: "last_update" }
				})
			);
		});

		this.render();
	}

	/**
	 * Render the component HTML in its Shadow DOM
	 */
	render() {
		this.shadowRoot.innerHTML = `
			<label for="last_update">Last update</label>

			<select name="last_update" id="last_update">
				<option value="">Any time</option>
				<option value="last_week">Last week</option>
				<option value="last_month">Last month</option>
				<option value="last_6_months">Last 6 months</option>
				<option value="last_year">Last year</option>
				<option value="last_2_years">Last 2 years</option>
				<option value="last_3_years">Last 3 years</option>
			</select>
		`;
	}
}
