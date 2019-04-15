var app = function (app) {
	app.makeController = function (m, v, stage) {
		const c = {};

		// With ZIM, there are two ways to call our desired function:
		// Normal JavaScript - is not chainable...
		v.petSelector.on("change", () => {
			zog(v.petSelector.currentValue)
			m.data[0] = v.petSelector.currentValue;
			m.updateData();
		});

		c.title = "Controller";

		// Or use HotSpots for lots of navigation...
		// Can simplify with a loop - see MVC example at https://zimjs.com/mvc
		const hs = new HotSpots([
			{ // pageIntro logo.
				page:v.pageIntro,
				rect:v.pageIntro.logo,
				call: function () {zog("clicking on hotspot for pageIntro.")}
			},
			// { // pageIntro tabs.
			// 	page:v.pageIntro,
			// 	rect:v.pageIntro.tabs.buttons[0],
			// 	call: function () {v.pages.go(v.pageChoosePet, "right");}
			// },
			{ // pageIntro tabs.
				page:v.pageIntro,
				rect:v.pageIntro.tabs.buttons[0],
				call: function () {v.pages.go(v.petScreen, "right");}
			},
			{ // pageIntro tabs.
				page:v.pageIntro,
				rect:v.pageIntro.tabs.buttons[1],
				call: function () {v.pages.go(v.aboutTheGame, "down");}
			},
			{ // aboutTheGame logo.
				page:v.aboutTheGame,
				rect:v.aboutTheGame.logo,
				call: function () {zog("clicking on hotspot for aboutTheGame.")}
			},
			// { // aboutTheGame tabs.
			// 	page:v.aboutTheGame,
			// 	rect:v.aboutTheGame.tabs.buttons[0],
			// 	call: function () {v.pages.go(v.pageChoosePet, "right");}
			// },
			{ // aboutTheGame tabs.
				page:v.aboutTheGame,
				rect:v.aboutTheGame.tabs.buttons[0],
				call: function () {v.pages.go(v.petScreen, "right");}
			},
			{ // aboutTheGame tabs.
				page:v.aboutTheGame,
				rect:v.aboutTheGame.tabs.buttons[1],
				call: function () {v.pages.go(v.pageIntro, "up");}
			},
			{ // pageChoosePet logo.
				page:v.pageChoosePet,
				rect:v.pageChoosePet.logo,
				call: function () {zog("clicking on hotspot for pageChoosePet.")}
			},
			{ // pageChoosePet tabs.
				page:v.pageChoosePet,
				rect:v.pageChoosePet.tabs.buttons[0],
				call: function () {v.pages.go(v.petScreen, "right");}
			},
			{ // pageChoosePet tabs.
				page:v.pageChoosePet,
				rect:v.pageChoosePet.tabs.buttons[1],
				call: function () {v.pages.go(v.pageIntro, "left");}
			},
			{ // pageChoosePet logo.
				page:v.pageChoosePet,
				rect:v.pageChoosePet.logo,
				call: function () {zog("clicking on hotspot for pageChoosePet.")}
			},
			{ // petScreen tabs.
				page:v.petScreen,
				rect:v.petScreen.tabs.buttons[0],
				call: function () {v.pages.go(v.pageIntro, "left");}
			}
		]);
		hs.show();

		frame.on("resize", () => {
			v.manager.resize();
			// v.label.center();
			stage.update();
		});
		return c;
	}
	return app;
} (app||{});
