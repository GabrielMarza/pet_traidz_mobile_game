var app = function (app) {
	app.makeController = function (m, v, stage) {
		const c = {};

		v.page1.tabs.change(
			function () {
				if (v.page1.tabs.currentValue == 2) {
					v.pages.go(v.page2, "down");
				}
			});

			// With ZIM, there are two ways to call our desired function:
			// Normal JavaScript - is not chainable...
			v.dial.on("change", () => {
				zog(v.dial.currentValue)
				m.data[0] = v.dial.currentValue;
				m.updateData();
			});

			// ZIM based chainable methode to call this function.
			v.slider.change(() => {
				zog(v.slider.currentValue)
				m.data[1] = v.slider.currentValue;
				m.updateData();
			});

			c.title = "Controller";

			// Or use HotSpots for lots of navigation...
			// Can simplify with a loop - see MVC example at https://zimjs.com/mvc
			const hs = new HotSpots([
				{ // page1 logo.
					page:v.page1,
					// rect:[0, 0, 100, 100],
					rect:v.page1.logo,
					call: function () {zog("clicking on hotspot for page1.")}
				},
				{ // page1 tabs.
					page:v.page1,
					// rect:[0, 0, 100, 100],
					rect:v.page1.tabs.buttons[1],
					call: function () {v.pages.go(v.page2, "down");}
				},
				{ // page2 logo.
					page:v.page2,
					// rect:[0, 0, 100, 100],
					rect:v.page2.logo,
					call: function () {zog("clicking on hotspot for page2.")}
				},
				{ // page2 tabs.
					page:v.page2,
					// rect:[0, 0, 100, 100],
					rect:v.page2.tabs.buttons[0],
					call: function () {v.pages.go(v.page1, "up");}
				}
			]);
			hs.show();

			frame.on("resize", function () {
				v.manager.resize();
				// v.label.center();
				stage.update();
			});
			return c;
		}
		return app;
	} (app||{});
