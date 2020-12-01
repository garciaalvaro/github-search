/**
 * Simple function to sanitize a string
 * @see https://stackoverflow.com/a/48226843
 */
export const sanitize = string => {
	const replacements = {
		'"': "&quot;",
		"'": "&#x27;",
		"/": "&#x2F;",
		"<": "&lt;",
		">": "&gt;",
		"&": "&amp;",
	};
	const reg = /[&<>"'/]/gi;

	return String(string).replace(reg, match => replacements[match]);
};
