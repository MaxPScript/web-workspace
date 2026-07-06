import { loadComponentCSS } from "./utils/css_loader.js";
//
export async function Content() {
	try {
		await loadComponentCSS("content");
		const response = await fetch("./js/templates/content.html");
		if (!response.ok) {
			throw new Error("Failed to load content template");
		}
		const template = await response.text();
		return template;
	} catch (error) {
		console.error("Error loading content:", error);
		return '<content class="content"><h1>Content failed to load</h1></content>';
	}
}
