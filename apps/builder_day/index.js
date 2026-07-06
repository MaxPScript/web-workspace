import { Header, hydrateHeader } from "./js/header.js";
import { Content } from "./js/content.js";
import { Footer } from "./js/footer.js";
//
// import { testPaths } from "./js/tests/test_css_path.js";
// testPaths();
//
const app = document.getElementById("app");

async function renderApp() {
	try {
		// app.innerHTML = `<div class="loading">Loading...</div>`;
		// load all components in parallel for better performance
		const [headerHTML, contentHTML, footerHTML] = await Promise.all([
			Header(),
			Content(),
			Footer(),
		]);
		app.innerHTML = `
            ${headerHTML}
            ${contentHTML}
            ${footerHTML}
        `;
		// 👇 VERY IMPORTANT: hydrate AFTER DOM exists
		hydrateHeader();
		const heroSection = document.getElementById("hero_section_id");
		window.addEventListener("hashchange", (ev) => {
			console.log(`hash is ${window.location.hash}`);
			heroSection.classList.toggle("hidden", window.location.hash !== "#home");
		});
	} catch (error) {
		console.error(`Error rendering app: ${error}`);
		app.innerHTML = `<div class="error">Failed to load app</div>`;
	}
}
renderApp();
//
//
