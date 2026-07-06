const loadedCSS = new Set();
//
export async function loadComponentCSS(componentName) {
	if (loadedCSS.has(componentName)) {
		return;
	}
	//
	return new Promise((resolve, reject) => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		// link.href = `../../css/css_components/${componentName}.css`;
		link.href = `./css/css_components/${componentName}.css`;
		link.id = `css_${componentName}`;

		link.onload = () => {
			console.log(`CSS loaded: ${componentName}`);
			loadedCSS.add(componentName);
			resolve();
		};

		link.onerror = () => {
			console.warn(`CSS not found for component: ${componentName}`);
			// Resolve anyway so the component still loads
			resolve();
		};

		document.head.appendChild(link);
	});
}
