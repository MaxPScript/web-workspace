import { loadComponentCSS } from "./utils/css_loader.js";
//
export async function Footer() {
	try {
		await loadComponentCSS("footer");
		const response = await fetch("./js/templates/footer.html");
		if (!response.ok) {
			throw new Error("Failed to load footer template");
		}
		const template = await response.text();
		return template;
	} catch (error) {
		console.error("Error loading footer:", error);
		return '<footer class="footer"><h1>Footer failed to load</h1></footer>';
	}
}
