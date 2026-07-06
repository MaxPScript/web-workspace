import { loadComponentCSS } from "./utils/css_loader.js";
import { headerData } from "./db/header_data.js";
//

//
export async function Header() {
	try {
		await loadComponentCSS("header");
		const response = await fetch("./js/templates/header.html");
		if (!response.ok) {
			throw new Error("Failed to load header template");
		}
		const template = await response.text();
		// console.log(template);
		return template;
	} catch (error) {
		console.error("Error loading header:", error);
		return '<header class="header"><h1>Header failed to load</h1></header>';
	}
}
// Hydration
export function hydrateHeader() {
	const select = document.getElementById("header_select_id");

	const dayEl = document.getElementById("header_span_day_id");
	const dateEl = document.getElementById("header_span_date_id");
	const monthEl = document.getElementById("header_span_month_id");
	const yearEl = document.getElementById("header_span_year_id");
	const infoEl = document.getElementById("header_span_info_id");
	//
	function update(year) {
		const d = headerData[year];

		if (!d) return;

		dayEl.textContent = d.day;
		dateEl.textContent = d.date;
		monthEl.textContent = d.month;
		yearEl.textContent = d.year;
		infoEl.textContent = d.info;
	}
	// initial render
	update(select.value);

	// on change
	select.addEventListener("change", (e) => {
		// update(e.target.value);
		//
		const year = Number(e.target.value);

		if (document.startViewTransition) {
			document.startViewTransition(() => {
				update(year);
			});
		} else {
			update(year);
		}
	});
}
