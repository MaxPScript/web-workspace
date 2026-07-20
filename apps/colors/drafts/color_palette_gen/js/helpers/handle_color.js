import { generatePalette } from "./generate_palette.js";

export function handleColor(target) {
	const bgColor = getComputedStyle(target).backgroundColor;
	console.log("Base color:", bgColor);

	// Generate palettes
	const palettes = generatePalette(bgColor);
	console.log("Generated palettes:", palettes);

	// Display palettes on the back of the card
	displayPalettes(palettes);
}

// Display palettes on the back side
function displayPalettes(palettes) {
	const backSection = document.querySelector(".main_back");
	if (!backSection) return;

	// Clear previous content
	backSection.innerHTML = "";

	// Create container for all palettes
	const container = document.createElement("div");
	container.className = "palettes-container";

	// Create each palette
	palettes.forEach((palette, index) => {
		const paletteDiv = document.createElement("div");
		paletteDiv.className = "palette-item";

		// Add palette name
		const nameSpan = document.createElement("span");
		nameSpan.className = "palette-name";
		nameSpan.textContent = `${index + 1}. ${palette.name}`;
		paletteDiv.appendChild(nameSpan);

		// Add color swatches
		const swatchesDiv = document.createElement("div");
		swatchesDiv.className = "swatches-container";

		palette.colors.forEach((color) => {
			const swatch = document.createElement("div");
			swatch.className = "color-swatch";
			swatch.style.backgroundColor = color;
			swatch.title = color;

			// Add color code
			const codeSpan = document.createElement("span");
			codeSpan.className = "color-code";
			codeSpan.textContent = color;
			swatch.appendChild(codeSpan);

			swatchesDiv.appendChild(swatch);
		});

		paletteDiv.appendChild(swatchesDiv);
		container.appendChild(paletteDiv);
	});

	backSection.appendChild(container);
}
