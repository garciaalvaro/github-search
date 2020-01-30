import { encode } from "../public/utils/encode.js";

describe("encode", () => {
	test("empty input", () => {
		const input = "";
		const output = "";

		expect(encode(input)).toBe(output);
	});

	test("no input", () => {
		const input = undefined;
		const output = "";

		expect(encode(input)).toBe(output);
	});

	test("spaces", () => {
		const input = "Some Text  Here ";
		const output = "Some+Text++Here+";

		expect(encode(input)).toBe(output);
	});

	test("special characters", () => {
		const input = "=?";
		const output = "%3D%3F";

		expect(encode(input)).toBe(output);
	});
});
