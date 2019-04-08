var app = function(app) {  // module pattern
	app.makeView = function(m, stage) {
		var stageW = stage.width;
		var stageH = stage.height;

		const v = {};

		STYLE = {
			type:{
				Tabs:{
					width:160,
					spacing:20,
					currentSelected:false
				},
				Button:{
					width:70,
					height:70,
					corner:35,
					backgroundColor:blue,
					rollBackgroundColor:orange,
					label:"",
					shadowBlur:-1
				}
			}
		}

		const manager = v.manager = new Manager();

		// Intro page...
		const pageIntro = v.pageIntro = new Container(stageW, stageH).addTo();
		let header = new Container().addTo(pageIntro);
		v.pageIntro.logo = new Label(m.title).addTo(header);

		let content = new Container(300, 300).addTo(pageIntro);
		// v.dial = new Dial().center(content);
		// v.dial.currentValue = m.data[0];

		v.petSelector = new Window({height:300, interactive:false, padding:0, slideDamp:.2}).center(content);
		v.petSelector.currentValue = m.data[0];

		let footer = v.pageIntro.tabs = new Tabs({
			tabs:[
				new Button({
					label:"Choose Your Pet",
					width:350,
					borderColor: white,
					shadowBlur: 25,
					borderWidth: 2
				}),
				new Button({
					label:"About the Game",
					width:350,
					borderColor: white,
					shadowBlur: 25,
					borderWidth: 2
				})
			],
			vertical:true
		}).addTo(pageIntro);
		// footer.buttons[0].setIcon("icon", pizzazz.makeIcon("settings", "white"))

		// Intro layout manager...
		manager.add(
			new Layout(pageIntro, [
				{object:header, maxHeight:90, marginTop:2},
				{object:content, marginTop:2, backgroundColor:green},
				{object:footer, maxWidth:90, marginTop:2}
			], 2, yellow, true, null, stage)
		);

		// Choosing a pet page...
		const pageChoosePet = v.pageChoosePet = new Container(stageW, stageH).addTo();
		header = new Container().addTo(pageChoosePet);
		v.pageChoosePet.logo = new Label("Choose Your Pet").addTo(header);

		content = new Container(300, 300).addTo(pageChoosePet);

		footer = v.pageChoosePet.tabs = new Tabs({
			tabs:[
				new Button({
					label:"Start Laughing",
					width:350,
					borderColor: white,
					shadowBlur: 25,
					borderWidth: 2
				}),
				new Button({
					label:"Back to Main Menu",
					width:350,
					borderColor: white,
					shadowBlur: 25,
					borderWidth: 2
				})
			],
			vertical:true
		}).addTo(pageChoosePet);

		// Choosing a pet layout manager...
		manager.add(
			new Layout(pageChoosePet, [
				{object:header, maxWidth:90, marginTop:5},
				{object:content, marginTop:2, backgroundColor:blue},
				{object:footer, maxWidth:90, marginTop:2}
			], 2, orange, true, null, stage)
		);

		// About the game page...
		const aboutTheGame = v.aboutTheGame = new Container(stageW, stageH).addTo();
		header = new Container().addTo(aboutTheGame);
		v.aboutTheGame.logo = new Label("About the Game").addTo(header);

		content = new Container(300, 300).addTo(aboutTheGame);

		footer = v.aboutTheGame.tabs = new Tabs({
			tabs:[
				new Button({
					label:"Choose Your Pet",
					width:350,
					borderColor: white,
					shadowBlur: 25,
					borderWidth: 2
				}),
				new Button({
					label:"Back to Main Menu",
					width:350,
					borderColor: white,
					shadowBlur: 25,
					borderWidth: 2
				})
			],
			vertical:true
		}).addTo(aboutTheGame);

		// About the game layout manager...
		manager.add(
			new Layout(aboutTheGame, [
				{object:header, maxWidth:90, marginTop:5},
				{object:content, marginTop:2, backgroundColor:red},
				{object:footer, maxWidth:90, marginTop:2}
			], 2, green, true, null, stage
		)
	);

	// Swiper...
	manager.add(
		v.pages = new Pages([
			{page:pageIntro, swipe:[null, null, pageChoosePet, pageChoosePet]},
			{page:pageIntro, swipe:[null, null, aboutTheGame, aboutTheGame]},
			{page:aboutTheGame, swipe:[null, null, pageChoosePet, pageChoosePet]},
			{page:aboutTheGame, swipe:[null, null, pageIntro, pageIntro]}
		], "slide", 500).addTo()
	);

	return v;
}
return app; // module pattern
}(app||{}); // module pattern
