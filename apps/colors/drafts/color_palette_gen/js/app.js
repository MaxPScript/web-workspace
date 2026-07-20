import "../node_modules/@maxmov/flipping_card/index.js";
import { handleColor } from "./helpers/handle_color.js";
// import { generatePalette } from "./helpers/generate_palette.js";
// generatePalette("blue");
// import "@maxmov/flipping_card";
//
const sliderRed = document.getElementById("slider_red_id");
const sliderGreen = document.getElementById("slider_green_id");
const sliderBlue = document.getElementById("slider_blue_id");
const valueRed = document.getElementById("value_red_id");
const valueGreen = document.getElementById("value_green_id");
const valueBlue = document.getElementById("value_blue_id");
const btnFront = document.getElementById("front_btn_id");
const btnBack = document.getElementById("back_btn_id");
//
function updateColor() {
	const r = sliderRed.value;
	const g = sliderGreen.value;
	const b = sliderBlue.value;
	//
	valueRed.textContent = r;
	valueGreen.textContent = g;
	valueBlue.textContent = b;
	//
	btnFront.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
//
sliderRed.addEventListener("input", updateColor);
sliderGreen.addEventListener("input", updateColor);
sliderBlue.addEventListener("input", updateColor);
//
updateColor();
//
const card = document.getElementById("flippin-card_id");
if (btnFront) {
	btnFront.addEventListener("click", (ev) => {
		handleColor(ev.target);
		card.flip();
	});
}

btnBack.addEventListener("click", (ev) => {
	console.log(card);
	card.flip();
});
