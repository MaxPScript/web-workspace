// Extracts sRGB components from a CSS Typed OM style object with type checking
export function getColorFromComputedStyleMap(computedStyles) {
	const bgValue = computedStyles.get("background-color");
	console.log(bgValue);
	if (!bgValue || !bgValue.constructor) {
		throw new Error(
			"The background color was not found or could not be analyzed.",
		);
	}
	if (bgValue instanceof CSSRGB) {
		return { r: bgValue.r, g: bgValue.g, b: bgValue.b };
	}
	if (typeof bgValue.to === "function") {
		try {
			const rgbColor = bgValue.to("srgb");
			return {
				r: rgbColor.r,
				g: rgbColor.g,
				b: rgbColor.b,
			};
		} catch (e) {
			throw new Error("Failed to convert this color type to sRGB.");
		}
	}
	throw new Error(
		"The background is not a solid color (perhaps it is a gradient or a picture).",
	);
}
