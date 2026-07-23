// Helper: convert rgb string to proper object
function rgbStringToObject(rgbStr) {
	const match = rgbStr.match(/\d+/g);
	if (!match) {
		return { r: 0, g: 0, b: 0 };
	}
	return {
		r: parseInt(match[0]),
		g: parseInt(match[1]),
		b: parseInt(match[2]),
	};
}

// Helper: rgb format to hsl format
function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return { h: h * 360, s: s * 100, l: l * 100 };
}

// Helper: hsl to rgb
function hslToRgb(h, s, l) {
	s /= 100;
	l /= 100;
	const k = (n) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n) =>
		l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	return {
		r: Math.round(f(0) * 255),
		g: Math.round(f(8) * 255),
		b: Math.round(f(4) * 255),
	};
}

// Helper: rgb to hex
function rgbToHex(r, g, b) {
	return (
		"#" +
		[r, g, b]
			.map((x) => {
				const hex = x.toString(16);
				return hex.length === 1 ? "0" + hex : hex;
			})
			.join("")
	);
}

// Generate complementary colors (opposite on color wheel)
function getComplementary(h, s, l, count = 5) {
	const colors = [];
	const step = 360 / count;
	for (let i = 0; i < count; i++) {
		const newH = (h + step * i) % 360;
		const rgb = hslToRgb(newH, s, l);
		colors.push(rgbToHex(rgb.r, rgb.g, rgb.b));
	}
	return colors;
}

// Generate analogous colors (adjacent on color wheel)
function getAnalogous(h, s, l, count = 5) {
	const colors = [];
	const step = 30; // 30 degrees between each color
	const start = h - 60; // start 60 degrees before base
	for (let i = 0; i < count; i++) {
		const newH = (start + step * i + 360) % 360;
		const rgb = hslToRgb(newH, s, l);
		colors.push(rgbToHex(rgb.r, rgb.g, rgb.b));
	}
	return colors;
}

// Generate triadic colors (120 degrees apart)
function getTriadic(h, s, l) {
	const colors = [];
	for (let i = 0; i < 3; i++) {
		const newH = (h + 120 * i) % 360;
		const rgb = hslToRgb(newH, s, l);
		colors.push(rgbToHex(rgb.r, rgb.g, rgb.b));
	}
	return colors;
}

// Generate tetradic (double complementary)
function getTetradic(h, s, l) {
	const colors = [];
	const angles = [0, 60, 180, 240];
	for (const angle of angles) {
		const newH = (h + angle) % 360;
		const rgb = hslToRgb(newH, s, l);
		colors.push(rgbToHex(rgb.r, rgb.g, rgb.b));
	}
	return colors;
}

// Generate square colors (90 degrees apart)
function getSquare(h, s, l) {
	const colors = [];
	for (let i = 0; i < 4; i++) {
		const newH = (h + 90 * i) % 360;
		const rgb = hslToRgb(newH, s, l);
		colors.push(rgbToHex(rgb.r, rgb.g, rgb.b));
	}
	return colors;
}

// Generate random colors (limited palette)
function getRandomColors(baseR, baseG, baseB, count = 3) {
	const colors = [];
	for (let i = 0; i < count; i++) {
		// Randomly adjust each channel by ±30
		const r = Math.max(
			0,
			Math.min(255, baseR + Math.floor(Math.random() * 60 - 30)),
		);
		const g = Math.max(
			0,
			Math.min(255, baseG + Math.floor(Math.random() * 60 - 30)),
		);
		const b = Math.max(
			0,
			Math.min(255, baseB + Math.floor(Math.random() * 60 - 30)),
		);
		colors.push(rgbToHex(r, g, b));
	}
	return colors;
}

// Generate ugly random colors (completely random)
function getUglyColors(count = 3) {
	const colors = [];
	for (let i = 0; i < count; i++) {
		// Generate random colors but ensure they're potentially ugly
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		colors.push(rgbToHex(r, g, b));
	}
	return colors;
}

// Main palette generation function
export function generatePalette(rgbString) {
	const rgb = rgbStringToObject(rgbString);
	// console.log("rgb object:", rgb);
	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
	// console.log(hsl);

	// Generate 6 harmony palettes
	const palettes = [
		{ name: "Complementary", colors: getComplementary(hsl.h, hsl.s, hsl.l, 5) },
		{ name: "Analogous", colors: getAnalogous(hsl.h, hsl.s, hsl.l, 5) },
		{ name: "Triadic", colors: getTriadic(hsl.h, hsl.s, hsl.l) },
		{ name: "Tetradic", colors: getTetradic(hsl.h, hsl.s, hsl.l) },
		{ name: "Square", colors: getSquare(hsl.h, hsl.s, hsl.l) },
		{
			name: "Monochromatic",
			colors: getComplementary(hsl.h, hsl.s * 0.5, hsl.l * 0.7, 5),
		},
	];

	// Generate 3 random/ugly palettes
	const randomPalettes = [
		// { name: "Random 1", colors: getRandomColors(rgb.r, rgb.g, rgb.b, 4) },
		// { name: "Random 2", colors: getRandomColors(rgb.r, rgb.g, rgb.b, 4) },
		{ name: "Ugly 1", colors: getUglyColors(4) },
		{ name: "Ugly 2", colors: getUglyColors(4) },
		{ name: "Ugly 3", colors: getUglyColors(4) },
	];

	return [...palettes, ...randomPalettes];
}
