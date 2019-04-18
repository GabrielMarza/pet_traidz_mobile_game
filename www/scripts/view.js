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
		v.pageIntro.logo = frame.asset("petlaughzlogo.png").clone().addTo(header);

		let content = new Container(300, 300).addTo(pageIntro);
		// v.dial = new Dial().center(content);
		// v.dial.currentValue = m.data[0];

		let footer = v.pageIntro.tabs = new Tabs({
			tabs:[
				new Button({
					label:"Start Laughing",
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
		zog(header, content, footer);

		// Intro layout manager...
		manager.add(
			new Layout(pageIntro, [
				{object:header, maxHeight:90, marginTop:2},
				{object:content, maxHeight:10, marginTop:2, backgroundColor:blue},
				{object:footer, maxWidth:90, marginTop:2}
			], 2, blue, true, null, stage)
		);

		// About the game page...
		const aboutTheGame = v.aboutTheGame = new Container(stageW, stageH).addTo();
		header = new Container().addTo(aboutTheGame);
		v.aboutTheGame.logo = frame.asset("aboutthegame.png").clone().sca(0.3).addTo(header);

		content = new Container(300, 300).addTo(aboutTheGame);
		v.aboutTheGame.text = frame.asset("howtotext.png").clone().sca(1.2).addTo(content).center();

		footer = v.aboutTheGame.tabs = new Tabs({
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
		}).addTo(aboutTheGame);

		// About the game layout manager...
		manager.add(
			new Layout(aboutTheGame, [
				{object:header, maxWidth:90, marginTop:5},
				{object:content, marginTop:2, backgroundColor:blue},
				{object:footer, maxWidth:90, marginTop:2}
			], 2, blue, true, null, stage)
		);

		// Choosing a pet page...
		const pageChoosePet = v.pageChoosePet = new Container(stageW, stageH).addTo();
		header = new Container().addTo(pageChoosePet);
		v.pageChoosePet.logo = frame.asset("chooseyourpet.png").clone().sca(0.3).addTo(header);

		content = new Container(300, 300).addTo(pageChoosePet);
		v.petSelector = new Window({backgroundColor:blue, shadowBlur:0, height:300, width:1000, interactive:false, padding:0, slideDamp:.2}).center(content);

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
			], 2, blue, true, null, stage)
		);

		// Pet screen page...
		const petScreen = v.petScreen = new Container(stageW, stageH).addTo();
		header = new Container().addTo(petScreen);
		v.petScreen.logo = frame.asset("yourownpet.png").clone().sca(0.3).addTo(header);

		content = new Container(300, 300).addTo(petScreen);
		v.petScreen.pet = frame.asset("tiger_happy.png").clone().sca(0.3).addTo(content).centerReg();
		// MAKE SCORE LABEL
		var scoreLabel = new Scorer({
			score:m.score,
			size:50,
			align:"left",
			color:white,
			backgroundColor:blue,
			isometric:null
		}).addTo(petScreen).sca(2)
		// let score = 0;
		let petEvent = v.petScreen.pet.on("mousedown", (e) => {
			scoreLabel.text = ++m.score;
			// m.data = score;
			m.updateData();
			zog("clicking on pet");
			v.petScreen.pet.animate({props:{scale:.2}, time:65, loop:false, loopCount:3, rewind:true, from:false});
		});

		footer = v.petScreen.tabs = new Tabs({
			tabs:[
				new Button({
					label:"Back to Home",
					width:350,
					borderColor: white,
					shadowBlur: 25,
					borderWidth: 2
				}),
				new Button({
					label:"Clear Score",
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
			], 2, blue, true, null, stage)
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
