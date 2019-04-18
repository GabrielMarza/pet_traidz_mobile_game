var app = function(app) { // module pattern
	app.makeData = function () {
		// const m = {
		//     title:"Mobile App"
		// };

		// Like above, or the version below...

		const m = {};

		// This is to clear the localStorage. Leave it uncommented if you don't want it cleared!
		// localStorage.clear();

		// Does localStorage exist? and do we have any data stored.
		// It's a JSON string, so now we need to parse it.
		if (localStorage && localStorage.exampleData) {
			m.score = JSON.parse(localStorage.exampleData);
		} else {
			// Store whatever the slider and dial are saying onto the user's device.
			// [dial, slider]
			m.score = 0;
		};

		// Update data, then stringify it and store it.
		// stringifying it will put "" around it and turn it into a readable string.
		m.updateData = () => {
			zog("updating!");
			localStorage.exampleData = JSON.stringify(m.score);
		};

		// We need the "m" outside the function scope, so we return "m".
		return m;
	}
	// We need the "app" outside the function scope, so we return "app".
	return app;
} (app||{}); // module pattern
