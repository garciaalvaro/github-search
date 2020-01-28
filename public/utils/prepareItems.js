import { getTimeSince } from "./getTimeSince.js";

/**
 * Prepare items returned from the GitHub API
 */
export const prepareItems = (items = []) => {
	return items.map(
		({
			id,
			html_url,
			description,
			name,
			owner,
			stargazers_count,
			language,
			updated_at,
			license
		}) => {
			description = description || "";
			name = name || "";
			language = language || "";
			license =
				license && license.name
					? license.name.replace("License", "license")
					: "";

			const url = html_url || "";
			const user = owner && owner.login ? owner.login : "";
			const stars = stargazers_count.toLocaleString() || 0;
			const updated = `${getTimeSince(new Date(updated_at))} ago` || "";

			return {
				id,
				url,
				description,
				name,
				user,
				stars,
				language,
				updated,
				license
			};
		}
	);
};
