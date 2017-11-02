var bannerID, numOfRepeats = 0;
var animationStartTime;

var collapsed_timeline;
var slider_timeline;
var expanded_portrait_timeline;
var expanded_landscape_timeline;
var expandCount = 0;
var video;


function exitHandler(e) {
	//add isDesktop, isMobile or isInApp but always keep isExpanded
	if(isExpanded == true) { requestManualCollapse(); }
	var target = e.toElement || e.relatedTarget || e.target || function () { throw "Failed to attach an event target!"; }
	console.log("EXIT", target.id);
	switch (target.id) {
	    case "firstFramesHotspot": Enabler.exit("firstFramesHotspot", "https://www.humira.com/crohns/patient-story"); break;
	    case "ctaBanner1": Enabler.exit("ctaBanner1", "https://www.humira.com/crohns/patient-story?ftvid=cdsymptoms"); break;
	    case "ctaBanner2": Enabler.exit("ctaBanner2", "https://www.humira.com/crohns/patient-story?ftvid=cdenoughwasenough"); break;
	    case "ctaBanner3": Enabler.exit("ctaBanner3", "https://www.humira.com/crohns/patient-story?ftvid=cddoctordialogue"); break;
	    case "ctaBanner1Land": Enabler.exit("ctaBanner1Land", "https://www.humira.com/crohns/patient-story?ftvid=cdsymptoms"); break;
	    case "ctaBanner2Land": Enabler.exit("ctaBanner2Land", "https://www.humira.com/crohns/patient-story?ftvid=cdenoughwasenough"); break;
	    case "ctaBanner3Land": Enabler.exit("ctaBanner3Land", "https://www.humira.com/crohns/patient-story?ftvid=cddoctordialogue"); break;
	    default: Enabler.exit("overall exit", "https://www.realcrohnstalk.com");
	}
	Enabler.requestCollapse();
}
function init() {
    //create variables of each div in the HTML file
	var array = document.getElementsByTagName("div");
	var ii = array.length;
	for(var i = 0; i < ii; i++){
		if(array[i].id){
			window[array[i].id] = getElem(array[i].id);
		} 
	}

	
	//Collapsed timeline
	collapsed_timeline = new TimelineMax({ onStart: setupCollapsed, onComplete: startSliderTimeline });
	collapsed_timeline
		.pause()
		.set([collapseButton, optionOne, optionTwo, optionThree, optionFour, videoHolder1, videoHolder2, videoHolder3, videoHolder4,
            choice1, choice2, choice3, choice4, leftArrow, rightArrow, ctaBanner, ctaBanner1, ctaBanner2, ctaBanner3, eText1, eText2, eText3, eText4, eText5, ctaPlay1, ctaPlay2, ctaPlay3,
            video1Poster, video2Poster, video3Poster, video4Poster, video1PosterLand, video2PosterLand, video3PosterLand, video4PosterLand, videoHolder1Land, videoHolder2Land, videoHolder3Land, videoHolder4Land
		],{autoAlpha:0})
		.set([eyebrow, background, aaron, firstFramesHotspot
		],{autoAlpha:1})

	    .addLabel("c-one", "+=.25")
        .to([cText1, cText2, aaronQuote, quote1, quote2], .25, { autoAlpha: 1 }, "c-one")
        .to([video1Poster, video2Poster, video3Poster, video4Poster, videoHolder1, videoHolder2, videoHolder3, videoHolder4 ], .10, { autoAlpha: 0 }, "c-one")
        .to([video1PosterLand, video2PosterLand, video3PosterLand, video4PosterLand, videoHolder1Land, videoHolder2Land, videoHolder3Land, videoHolder4Land], .10, { autoAlpha: 0 }, "c-one")

        .addLabel("c-two", "+=2.5")
        .set(quote2, { left: 84 }, "c-two")
        .to([cText2, aaronQuote, quote1, quote2, aaron], .25, { autoAlpha: 0 }, "c-two")
        .to([mette], .25, { autoAlpha: 1 }, "c-two")
        .to([cText3, metteQuote, quote1, quote2], .25, { autoAlpha: 1 })

        .addLabel("c-three", "+=2.5")
        .set(quote2, { left: 143 }, "c-three")
        .set(quote1, { left: 13 }, "c-three")
        .to([cText3, metteQuote, quote1, quote2, mette], .25, { autoAlpha: 0 }, "c-three")
        .to([autumn], .25, { autoAlpha: 1 }, "c-three")
        .to([cText4, autumnQuote, quote1, quote2], .25, { autoAlpha: 1 })


        .addLabel("c-four", "+=2.50")
        .set(bubbleFill, { left: 130 }, "c-four")
        .to([cText1, cText4, autumnQuote, quote1, quote2, autumn, firstFramesHotspot], .25, { autoAlpha: 0 }, "c-four")
        .to([blueBG, leftSide, rightSide, number, rightArrow, cText5, choice1, choiceBox, playButton, bubbles, bubbleFill, optionOne, dot1, dot2, dot3, dot4], .25, { autoAlpha: 1 }, "c-four")
        .to(choice1, .25, { left: 0 }, "c-four")

		.pause();

    //Slider timeline
	slider_timeline = new TimelineMax({ onComplete: completeCollapsedTimeline });
	slider_timeline
		.pause()
		.set([collapseButton], { autoAlpha: 0 })
		.set([], { autoAlpha: 1 })

         .to(rightArrow, .50, { left: 246, yoyo: true, repeat: 2 })

        .addLabel("s-one", "+=3.5")
        .to(optionOne, .25, { autoAlpha: 0, className: "option" }, "s-one")
        .to(choice1, .25, { left: -300 }, "s-one")
        .to([choice2, leftArrow, optionTwo], .25, { autoAlpha: 1 }, "s-one")
        .to(choice2, .25, { left: 0 }, "s-one")
        .to(optionTwo, .25, { className: "showing" }, "s-one")
        .set(bubbleFill, { left: 142 })

        .addLabel("s-two", "+=3.5")
        .to(optionTwo, .25, { autoAlpha: 0, className: "option" }, "s-two")
        .to(choice2, .25, { left: -300 }, "s-two")
        .to([choice3, optionThree], .25, { autoAlpha: 1 }, "s-two")
        .to(choice3, .25, { left: 0 }, "s-two")
        .to(optionThree, .25, { className: "showing" }, "s-two")
        .set(bubbleFill, { left: 154 })

        .addLabel("s-three", "+=3.5")
        .to(optionThree, .25, { autoAlpha: 0, className: "option" }, "s-three")
        .to(choice3, .25, { left: -300 }, "s-three")
        .to([choice4, optionFour], .25, { autoAlpha: 1 }, "s-three")
        .to(choice4, .25, { left: 0 }, "s-three")
        .to(optionFour, .25, { className: "showing" }, "s-three")
        .to([rightArrow], .25, { autoAlpha: 0 }, "s-three")
        .set(bubbleFill, { left: 167 })



		.pause();
	
	//Expanded portrait timeline
	expanded_portrait_timeline = new TimelineMax({onComplete:completeExpandedTimeline});	
    expanded_portrait_timeline
		.pause()
		.set([optionOne, optionTwo, optionThree, optionFour, firstFramesHotspot,
		video1PosterLand, video2PosterLand, video3PosterLand, video4PosterLand, videoHolder1Land, videoHolder2Land, videoHolder3Land, videoHolder4Land
		], { autoAlpha: 0 })
		.set([collapseButton, ctaBanner, ctaBanner1, ctaBanner2, ctaBanner3], { autoAlpha: 1 })
        .to([eText1, eText2, eText3, eText4, eText5, ctaPlay1, ctaPlay2, ctaPlay3], .25, { autoAlpha: 1 })

		.pause();
		
	//Expanded landscape timeline
	expanded_landscape_timeline = new TimelineMax({onComplete:completeExpandedTimeline});	
    expanded_landscape_timeline
		.pause()
		.set([optionOne, optionTwo, optionThree, optionFour, firstFramesHotspot,
		video1Poster, video2Poster, video3Poster, video4Poster, videoHolder1, videoHolder2, videoHolder3, videoHolder4
		], { autoAlpha: 0 })
		.set([collapseButton, ctaBannerLand, ctaBanner1Land, ctaBanner2Land, ctaBanner3Land], { autoAlpha: 1 })
        .to([blackBox, eText1Land, eText2Land, eText3Land, eText4Land, eText5Land, eyebrowExpandedLand], .25, { autoAlpha: 1 })


		.pause();
		
	//collapse/expand events and expand background exit	
	hotspot.addEventListener( 'click', actionClickHandler, false);
	if (isInApp == false) { collapseButton.addEventListener('click', requestManualCollapse, false); }
	firstFramesHotspot.addEventListener("click", exitHandler);
    //exits
	optionOne.addEventListener('click', actionClickHandler, false);
	optionTwo.addEventListener('click', actionClickHandler, false);
	optionThree.addEventListener('click', actionClickHandler, false);
	optionFour.addEventListener('click', actionClickHandler, false);

	collapseButton.addEventListener('click', actionClickHandler, false);
	

	leftArrow.addEventListener('click', arrowClickHandler, false);
	rightArrow.addEventListener('click', arrowClickHandler, false);
	//rightArrow.addEventListener("mouseover", arrowWiggleR);
	//leftArrow.addEventListener("mouseover", arrowWiggleL);

	//ctaPlay1.addEventListener("mouseover", ctaWiggle1);
	//ctaPlay2.addEventListener("mouseover", ctaWiggle2);
	//ctaPlay3.addEventListener("mouseover", ctaWiggle3);
	//ctaPlay1.addEventListener("click", exitHandler);
	ctaPlay2.addEventListener("click", exitHandler);
	ctaPlay3.addEventListener("click", exitHandler);

	dot1.addEventListener("click", dotClickHandler);
	dot2.addEventListener("click", dotClickHandler);
	dot3.addEventListener("click", dotClickHandler);
	dot4.addEventListener("click", dotClickHandler);

	ctaBanner1.addEventListener('click', exitHandler, false);
	ctaBanner2.addEventListener('click', exitHandler, false);
	ctaBanner3.addEventListener('click', exitHandler, false);
	ctaBanner1Land.addEventListener('click', exitHandler, false);
	ctaBanner2Land.addEventListener('click', exitHandler, false);
	ctaBanner3Land.addEventListener('click', exitHandler, false);
	
	//show on launch
    TweenMax.set([
		shared,cover,viewport,collapsePanel,scaleHolder,border
			], {autoAlpha:1});
    startCollapseTimeline();
}
//panels

function playVideo1() {
    var video = document.getElementById('myVideo1');
    myVideo1.play();
    TweenMax.to(video1Poster, .25, { autoAlpha: 0 })
    myVideo1.addEventListener('ended', function () {
        TweenMax.to(video1Poster, .25, { autoAlpha: 1 })
    });
}
function playVideo1Land() {
    var video = document.getElementById('myVideo1Land');
    myVideo1Land.play();
    TweenMax.to(video1PosterLand, .25, { autoAlpha: 0 })
    myVideo1Land.addEventListener('ended', function () {
        TweenMax.to(video1PosterLand, .25, { autoAlpha: 1 })
    });
}
function playVideo2() {
    var video = document.getElementById('myVideo2');
    myVideo2.play();
    TweenMax.to(video2Poster, .25, { autoAlpha: 0 })
    myVideo2.addEventListener('ended', function () {
        TweenMax.to(video2Poster, .25, { autoAlpha: 1 })
    });
}
function playVideo2Land() {
    var video = document.getElementById('myVideo2Land');
    myVideo2Land.play();
    TweenMax.to(video2PosterLand, .25, { autoAlpha: 0 })
    myVideo2Land.addEventListener('ended', function () {
        TweenMax.to(video2PosterLand, .25, { autoAlpha: 1 })
    });
}
function playVideo3() {
    var video = document.getElementById('myVideo3');
    myVideo3.play();
    TweenMax.to(video3Poster, .25, { autoAlpha: 0 })
    myVideo3.addEventListener('ended', function () {
        TweenMax.to(video3Poster, .25, { autoAlpha: 1 })
    });
}
function playVideo3Land() {
    var video = document.getElementById('myVideo3Land');
    myVideo3Land.play();
    TweenMax.to(video3PosterLand, .25, { autoAlpha: 0 })
    myVideo3Land.addEventListener('ended', function () {
        TweenMax.to(video3PosterLand, .25, { autoAlpha: 1 })
    });
}
function playVideo4() {
    var video = document.getElementById('myVideo4');
    myVideo4.play();
    TweenMax.to(video4Poster, .25, { autoAlpha: 0 })
    myVideo4.addEventListener('ended', function () {
        TweenMax.to(video4Poster, .25, { autoAlpha: 1 })
    });
}
function playVideo4Land() {
    var video = document.getElementById('myVideo4Land');
    myVideo4Land.play();
    TweenMax.to(video4PosterLand, .25, { autoAlpha: 0 })
    myVideo4Land.addEventListener('ended', function () {
        TweenMax.to(video4PosterLand, .25, { autoAlpha: 1 })
    });
}


//function ctaWiggle1() {
//    TweenMax.to(ctaPlay1, .25, { yoyo: true, repeat: 1, left: 158 })
//}
//function ctaWiggle2() {
//    TweenMax.to(ctaPlay2, .25, { yoyo: true, repeat: 1, left: 363 })
//}
//function ctaWiggle3() {
//    TweenMax.to(ctaPlay3, .25, { yoyo: true, repeat: 1, left: 563 })
//}

//function arrowWiggleR() {
//    TweenMax.to(rightArrow, .25, { yoyo: true, repeat: 1, left: 252 })
//}
//function arrowWiggleL() {
//    TweenMax.to(leftArrow, .25, { yoyo: true, repeat: 1, left: -13 })
//}


function videoOne() {
    if (isPortrait == true) {
        video = document.getElementById('myVideo1');
        TweenMax.set([video1Poster, collapseButton, eText1, eText2, eText3, eText4, eText5, ctaPlay1, ctaPlay2, ctaPlay3, ctaBanner, ctaBanner1, ctaBanner2, ctaBanner3, eyebrowExpanded, videoHolder1], { autoAlpha: 1 })
        TweenMax.set([videoHolder2, videoHolder3, videoHolder4, video2Poster, video2Poster, video3Poster, ], { autoAlpha: 0 })
        TweenMax.to([videoHolder1, video1Poster], .25, { autoAlpha: 1 })
    } else {
        video = document.getElementById('myVideo1Land');
        TweenMax.set([video1PosterLand, collapseButton, eText1Land, eText2Land, eText3Land, eText4Land, eText5Land, ctaBannerLand, ctaBanner1Land, ctaBanner2Land, ctaBanner3Land, eyebrowExpandedLand, videoHolder1Land], { autoAlpha: 1 })
        TweenMax.set([videoHolder2Land, videoHolder3Land, videoHolder4Land, video2PosterLand, video2PosterLand, video3PosterLand, ], { autoAlpha: 0 })
        TweenMax.to([videoHolder1Land, video1PosterLand], .25, { autoAlpha: 1 })
    }
    slider_timeline.pause(0);
}
function videoTwo() {
    if (isPortrait == true) {
        video = document.getElementById('myVideo2');
        TweenMax.set([video2Poster, collapseButton, eText1, eText2, eText3, eText4, eText5, ctaPlay1, ctaPlay2, ctaPlay3, ctaBanner, ctaBanner1, ctaBanner2, ctaBanner3, eyebrowExpanded, videoHolder2], { autoAlpha: 1 })
        TweenMax.set([videoHolder1, video1Poster, video3Poster, video4Poster, videoHolder3, videoHolder4], { autoAlpha: 0 })
        TweenMax.to([videoHolder2, video2Poster, ], .25, { autoAlpha: 1 })
    } else {
        video = document.getElementById('myVideo2Land');
        TweenMax.set([video2PosterLand, collapseButton, eText1Land, eText2Land, eText3Land, eText4Land, eText5Land, ctaBannerLand, ctaBanner1Land, ctaBanner2Land, ctaBanner3Land, eyebrowExpandedLand, videoHolder2Land], { autoAlpha: 1 })
        TweenMax.set([videoHolder1Land, video1PosterLand, video3PosterLand, video4PosterLand, videoHolder3Land, videoHolder4Land], { autoAlpha: 0 })
        TweenMax.to([videoHolder2Land, video2PosterLand, ], .25, { autoAlpha: 1 })
    }
    slider_timeline.pause(0);
}
function videoThree() {
    if (isPortrait == true) {
        video = document.getElementById('myVideo3');
        TweenMax.set([video3Poster, collapseButton, eText1, eText2, eText3, eText4, eText5, ctaPlay1, ctaPlay2, ctaPlay3, ctaBanner, ctaBanner1, ctaBanner2, ctaBanner3, eyebrowExpanded, videoHolder3], { autoAlpha: 1 })
        TweenMax.set([videoHolder1, video1Poster, video2Poster, video4Poster, videoHolder2, videoHolder4], { autoAlpha: 0 })
        TweenMax.to([videoHolder3, video3Poster, ], .25, { autoAlpha: 1 })
    } else {
        video = document.getElementById('myVideo3Land');
        TweenMax.set([video3PosterLand, collapseButton, eText1Land, eText2Land, eText3Land, eText4Land, eText5Land, ctaBannerLand, ctaBanner1Land, ctaBanner2Land, ctaBanner3Land, eyebrowExpandedLand, videoHolder3Land], { autoAlpha: 1 })
        TweenMax.set([videoHolder1Land, video1PosterLand, video2PosterLand, video4PosterLand, videoHolder2Land, videoHolder4Land], { autoAlpha: 0 })
        TweenMax.to([videoHolder3Land, video3PosterLand, ], .25, { autoAlpha: 1 })
    }
    slider_timeline.pause(0);

}
function videoFour() {
    if (isPortrait == true) {
        video = document.getElementById('myVideo4');
        TweenMax.set([collapseButton, eText1, eText2, eText3, eText4, eText5, ctaPlay1, ctaPlay2, ctaPlay3, ctaBanner, ctaBanner1, ctaBanner2, ctaBanner3, eyebrowExpanded, videoHolder4], { autoAlpha: 1 })
        TweenMax.set([videoHolder1, video1Poster, video2Poster, video3Poster, videoHolder2, videoHolder3], { autoAlpha: 0 })
        TweenMax.to([videoHolder4, video4Poster, ], .25, { autoAlpha: 1 })
    } else {
        video = document.getElementById('myVideo4Land');
        TweenMax.set([collapseButton, eText1Land, eText2Land, eText3Land, eText4Land, eText5Land, ctaBannerLand, ctaBanner1Land, ctaBanner2Land, ctaBanner3Land, eyebrowExpandedLand, videoHolder4Land], { autoAlpha: 1 })
        TweenMax.set([videoHolder1Land, video1PosterLand, video2PosterLand, video3PosterLand, videoHolder2Land, videoHolder3Land], { autoAlpha: 0 })
        TweenMax.to([videoHolder4Land, video4PosterLand, ], .25, { autoAlpha: 1 })
    }
    slider_timeline.pause(0);
}

function dotClickHandler() {
    console.log('dot clicked' + this.id);
    var dot = this.id;
    var options = document.querySelectorAll('.option');
    var option = document.querySelector('.showing').id;
    console.log(option);

    slider_timeline.pause(0);
    TweenMax.set(leftArrow, { left: -7 })
    TweenMax.set(rightArrow, { left: 249 })

    if (dot == 'dot1' && option == 'optionTwo') {
        console.log(' navigate to optionOne from optionTwo ');
        TweenMax.to(optionTwo, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to(leftArrow, .25, { autoAlpha: 0 })
        TweenMax.to([choice2, choice3, choice4], .25, { autoAlpha: 0 })
        TweenMax.to([choice1, optionOne], .25, { autoAlpha: 1 })
        TweenMax.to(choice1, .25, { left: 0 })
        TweenMax.to(optionOne, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 130 })
    }
    if (dot == 'dot1' && option == 'optionThree') {
        console.log(' navigate to optionOne from optionThree');
        TweenMax.to(optionThree, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to(leftArrow, .25, { autoAlpha: 0 })
        TweenMax.to([choice2, choice3, choice4], .25, { autoAlpha: 0 })
        TweenMax.to([choice1, optionOne], .25, { autoAlpha: 1 })
        TweenMax.to(choice1, .25, { left: 0 })
        TweenMax.to(optionOne, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 130 })
    }
    if (dot == 'dot1' && option == 'optionFour') {
        console.log(' navigate to optionOne from optionFour');
        TweenMax.to(optionFour, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to(leftArrow, .25, { autoAlpha: 0 })
        TweenMax.to([choice2, choice3, choice4], .25, { autoAlpha: 0 })
        TweenMax.to([choice1, optionOne, rightArrow], .25, { autoAlpha: 1 })
        TweenMax.to(choice1, .25, { left: 0 })
        TweenMax.to(optionOne, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 130 })
    }

    if (dot == 'dot2' && option == 'optionOne') {
        console.log(' navigate to optionTwo from optionOne ');
        TweenMax.to(optionOne, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice3, choice4], .25, { autoAlpha: 0 })
        TweenMax.to([choice2, optionTwo, leftArrow], .25, { autoAlpha: 1 })
        TweenMax.to(choice2, .25, { left: 0 })
        TweenMax.to(optionTwo, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 142 })
    }
    if (dot == 'dot2' && option == 'optionThree') {
        console.log(' navigate to optionTwo from optionThree');
        TweenMax.to(optionThree, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice3, choice4], .25, { autoAlpha: 0 })
        TweenMax.to([choice2, optionTwo, leftArrow], .25, { autoAlpha: 1 })
        TweenMax.to(choice2, .25, { left: 0 })
        TweenMax.to(optionTwo, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 142 })
    }
    if (dot == 'dot2' && option == 'optionFour') {
        console.log(' navigate to optionTwo from optionFour');
        TweenMax.to(optionFour, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice3, choice4], .25, { autoAlpha: 0 })
        TweenMax.to([choice2, optionTwo, leftArrow, rightArrow], .25, { autoAlpha: 1 })
        TweenMax.to(choice2, .25, { left: 0 })
        TweenMax.to(optionTwo, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 142 })
    }

    if (dot == 'dot3' && option == 'optionOne') {
        console.log(' navigate to optionThree from optionOne ');
        TweenMax.to(optionOne, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice2, choice4], .25, { autoAlpha: 0 })
        TweenMax.to([choice3, optionThree, leftArrow], .25, { autoAlpha: 1 })
        TweenMax.to(choice3, .25, { left: 0 })
        TweenMax.to(optionThree, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 154 })
    }
    if (dot == 'dot3' && option == 'optionTwo') {
        console.log(' navigate to optionThree from optionTwo');
        TweenMax.to(optionTwo, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice2, choice4], .25, { autoAlpha: 0 })
        TweenMax.to([choice3, optionThree, leftArrow], .25, { autoAlpha: 1 })
        TweenMax.to(choice3, .25, { left: 0 })
        TweenMax.to(optionThree, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 154 })
    }
    if (dot == 'dot3' && option == 'optionFour') {
        console.log(' navigate to optionThree from optionFour');
        TweenMax.to(optionFour, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice2, choice4], .25, { autoAlpha: 0 })
        TweenMax.to([choice3, optionThree, leftArrow, rightArrow], .25, { autoAlpha: 1 })
        TweenMax.to(choice3, .25, { left: 0 })
        TweenMax.to(optionThree, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 154 })
    }

    if (dot == 'dot4' && option == 'optionOne') {
        console.log(' navigate to optionFour from optionOne ');
        TweenMax.to(optionOne, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice2, choice3], .25, { autoAlpha: 0 })
        TweenMax.to(rightArrow, .25, { autoAlpha: 0 })
        TweenMax.to([choice4, optionFour, leftArrow], .25, { autoAlpha: 1 })
        TweenMax.to(choice4, .25, { left: 0 })
        TweenMax.to(optionFour, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 167 })
    }
    if (dot == 'dot4' && option == 'optionTwo') {
        console.log(' navigate to optionFour from optionTwo');
        TweenMax.to(optionTwo, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice2, choice3], .25, { autoAlpha: 0 })
        TweenMax.to(rightArrow, .25, { autoAlpha: 0 })
        TweenMax.to([choice4, optionFour, leftArrow], .25, { autoAlpha: 1 })
        TweenMax.to(choice4, .25, { left: 0 })
        TweenMax.to(optionFour, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 167 })
    }
    if (dot == 'dot4' && option == 'optionThree') {
        console.log(' navigate to optionFour from optionThree');
        TweenMax.to(optionThree, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice2, choice3], .25, { autoAlpha: 0 })
        TweenMax.to(rightArrow, .25, { autoAlpha: 0 })
        TweenMax.to([choice4, optionFour, leftArrow], .25, { autoAlpha: 1 })
        TweenMax.to(choice4, .25, { left: 0 })
        TweenMax.to(optionFour, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 167 })
    }



}

function arrowClickHandler() {
    console.log('arrow clicked ' + this.id);
    var arrow = this.id;
    var options = document.querySelectorAll('.option');
    var option = document.querySelector('.showing').id;
    console.log(option);

    //TODO: ? pause timeline and navigate using the arrow buttons. 
    slider_timeline.pause(0);


    if (arrow == 'rightArrow' && option == 'optionOne') {
        TweenMax.set(rightArrow, { left: 249 })
        TweenMax.to(rightArrow, .25, { yoyo: true, repeat: 1, left: 252 })
        console.log(' navigate to optionTwo ');
        TweenMax.to(optionOne, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to(choice1, .25, { left: -300 })
        TweenMax.to([choice2, leftArrow, optionTwo], .25, { autoAlpha: 1 })
        TweenMax.to(choice3, .25, { left: 0 })
        TweenMax.to(optionTwo, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 142 })
    }
    if (arrow == 'rightArrow' && option == 'optionTwo') {
        TweenMax.set(rightArrow, { left: 249 })
        TweenMax.to(rightArrow, .25, { yoyo: true, repeat: 1, left: 252 })
        console.log(' navigate to optionThree ');
        TweenMax.to([optionOne, optionTwo], .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice2], .25, { left: -300 })
        TweenMax.to([choice3, leftArrow, optionThree], .25, { autoAlpha: 1 })
        TweenMax.to(choice3, .25, { left: 0 })
        TweenMax.to(optionThree, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 154 })
    }
    if (arrow == 'rightArrow' && option == 'optionThree') {
        TweenMax.set(rightArrow, { left: 249 })
        TweenMax.to(rightArrow, .25, { yoyo: true, repeat: 1, left: 252 })
        console.log(' navigate to optionFour ');
        TweenMax.to([optionOne, optionTwo, optionThree], .25, { autoAlpha: 0, className: "option" })
        TweenMax.to([choice1, choice2, choice3], .25, { left: -300 })
        TweenMax.to([choice4, leftArrow, optionFour], .25, { autoAlpha: 1 })
        TweenMax.to(choice4, .25, { left: 0 })
        TweenMax.to(optionFour, .25, { className: "showing" })
        TweenMax.to([rightArrow], .25, { autoAlpha: 0 })
        TweenMax.set(bubbleFill, { left: 167 })
    }

    if (arrow == 'leftArrow' && option == 'optionTwo') {
        TweenMax.set(leftArrow, { left: -7 })
        TweenMax.to(leftArrow, .25, { yoyo: true, repeat: 1, left: -13 })
        console.log(' navigate to optionOne ');
        TweenMax.to(optionTwo, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to(leftArrow, .25, { autoAlpha: 0 })
        TweenMax.to(choice2, .25, { left: 300 })
        TweenMax.to([choice1, optionOne], .25, { autoAlpha: 1 })
        TweenMax.to(choice1, .25, { left: 0 })
        TweenMax.to(optionOne, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 130 })
    }
    if (arrow == 'leftArrow' && option == 'optionThree') {
        TweenMax.set(leftArrow, { left: -7 })
        TweenMax.to(leftArrow, .25, { yoyo: true, repeat: 1, left: -13 })
        console.log(' navigate to optionTwo ');
        TweenMax.to(optionThree, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to(choice3, .25, { left: 300 })
        TweenMax.to([choice2, leftArrow, optionThree], .25, { autoAlpha: 1 })
        TweenMax.to(choice2, .25, { left: 0 })
        TweenMax.to(optionTwo, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 142 })
    }
    if (arrow == 'leftArrow' && option == 'optionFour') {
        TweenMax.set(leftArrow, { left: -7 })
        TweenMax.to(leftArrow, .25, { yoyo: true, repeat: 1, left: -13 })
        console.log(' navigate to optionFour ');
        TweenMax.to(optionFour, .25, { autoAlpha: 0, className: "option" })
        TweenMax.to(choice4, .25, { left: 300 })
        TweenMax.to([choice1, choice2], .25, { left: -300 })
        TweenMax.to([choice3, leftArrow, rightArrow, optionThree], .25, { autoAlpha: 1 })
        TweenMax.to(choice3, .25, { left: 0 })
        TweenMax.to(optionThree, .25, { className: "showing" })
        TweenMax.set(bubbleFill, { left: 154 })
    }



}


function setupCollapsed(){
}
function startCollapse(){
	console.log('startCollapse');
}
function collapsedComplete(){
	console.log('collapsedComplete');
	resetExpandTimeline();
    startCollapseTimeline();
}
function completeCollapsedTimeline(){
}
function startExpand(){
	console.log('startExpand');
}
function expandComplete(){
	console.log('expandComplete');
	resetCollapseTimeline();
    startExpandTimeline();
}
function completeExpandedTimeline(){
}
//timelines
function resetCollapseTimeline() {
    console.log('resetCollapseTimeline');
	collapsed_timeline.pause(0);
}
function startCollapseTimeline() {
    console.log('startCollapseTimeline');
	collapsed_timeline.play(0);
}
function resetSliderTimeline() {
    console.log('resetCollapseTimeline');
    requestManualCollapse()
    slider_timeline.pause(0);
}
function startSliderTimeline() {
    console.log('startCollapseTimeline');
    slider_timeline.play();
}
function resetExpandTimeline() {
    console.log('resetExpandTimeline');
    expanded_portrait_timeline.pause(0);
    expanded_landscape_timeline.pause(0);
    slider_timeline.pause(0);
    video.pause();
    video.currentTime = 0;
}
function startExpandTimeline() {
    console.log('startExpandTimeline');
	expandCount++;
	if(isPortrait == true) {
		expanded_portrait_timeline.play(0);
	} else {
		expanded_landscape_timeline.play(0);
	}
}
function animationCompleted(){
}

