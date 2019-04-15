var app = function(app) {  // module pattern
	app.makeView = function(m, stage) {
		var stageW = stage.width;
		var stageH = stage.height;

		frame.on("complete", function () {
			var aboutLogo = frame.asset("aboutthegame.png");
			var chooseYourPetLogo = frame.asset("chooseyourpet.png");
			// var petlaughzlogo = frame.asset("petlaughzlogo.png");
			stage.update();
		});

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
		v.pageIntro.logo = frame.asset("petlaughzlogo.png").addTo(header);

		let content = new Container(300, 300).addTo(pageIntro);
		// v.dial = new Dial().center(content);
		// v.dial.currentValue = m.data[0];

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

		// Intro layout manager...
		manager.add(
			new Layout(pageIntro, [
				{object:header, maxHeight:90, marginTop:2},
				{object:content, maxHeight:10, marginTop:2, backgroundColor:blue},
				{object:footer, maxWidth:90, marginTop:2}
			], 2, yellow, true, null, stage)
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
				{object:content, marginTop:2, backgroundColor:blue},
				{object:footer, maxWidth:90, marginTop:2}
			], 2, green, true, null, stage)
		);

		// Choosing a pet page...
		const pageChoosePet = v.pageChoosePet = new Container(stageW, stageH).addTo();
		header = new Container().addTo(pageChoosePet);
		v.pageChoosePet.logo = new Label("Choose Your Pet").addTo(header);

		content = new Container(300, 300).addTo(pageChoosePet);
		v.petSelector = new Window({backgroundColor:blue, shadowBlur:0, height:300, width:1000, interactive:false, padding:0, slideDamp:.2}).center(content);
		v.petSelector.currentValue = m.data[0];

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

		// Pet screen page...
		const petScreen = v.petScreen = new Container(stageW, stageH).addTo();
		header = new Container().addTo(petScreen);
		v.petScreen.logo = frame.asset("petlaughzlogo.png").addTo(header);
		// var score = new Score({score:m.data, backroundColor:yellow, color:black, isometric:null}).addTo(header);

		content = new Container(300, 300).addTo(petScreen);
		// MAKE SCORE LABEL
		var scoreLabel = new Label({
			text:0,
			size:50,
			align:"right",
			color:white,
			backgroundColor:blue
		}).addTo(petScreen)

		footer = v.petScreen.tabs = new Tabs({
			tabs:[
				new Button({
					label:"Back to Home",
					width:350,
					borderColor: white,
					shadowBlur: 25,
					borderWidth: 2
				})
			],
			vertical:true
			// footer.buttons[0].setIcon("icon", pizzazz.makeIcon("home", "white"));
		}).addTo(petScreen);

		// Pet screen layout manager...
		manager.add(
			new Layout(petScreen, [
				{object:header, maxHeight:90, marginTop:2},
				{object:content, marginTop:2, backgroundColor:blue},
				{object:footer, maxWidth:90, marginTop:2}
			], 2, purple, true, null, stage)
		);

		// Swiper...
		manager.add(
			v.pages = new Pages([
				// {page:pageIntro, swipe:[null, null, pageChoosePet, pageChoosePet]},
				{page:pageIntro, swipe:[null, null, petScreen, petScreen]},
				{page:pageIntro, swipe:[null, null, aboutTheGame, aboutTheGame]},
				// {page:aboutTheGame, swipe:[null, null, pageChoosePet, pageChoosePet]},
				{page:aboutTheGame, swipe:[null, null, petScreen, petScreen]},
				{page:aboutTheGame, swipe:[null, null, pageIntro, pageIntro]},
				{page:pageChoosePet, swipe:[null, null, pageIntro, pageIntro]},
				{page:pageChoosePet, swipe:[null, null, petScreen, petScreen]},
				{page:petScreen, swipe:[null, null, pageIntro, pageIntro]}
			], "slide", 500).addTo()
		);

		return v;
	}
	return app; // module pattern
}(app||{}); // module pattern
