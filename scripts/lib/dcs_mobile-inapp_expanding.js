var isExpanded = false;
var isPortrait;

var fullscreenIsSupported;
var fullscreenDimensions = {width:0, height:0, longSide:0, shortSide:0};
var isInApp,isMobile,isDesktop;
var c_stageWidth, c_stageHeight, e_stageWidth, e_stageHeight;
var e_p_stageWidth, e_p_stageHeight, e_l_stageWidth, e_l_stageHeight;
var elem,style;
var desiredScale = 1;
var thisConfiguration;
var currentOrientation;
var windowResizeTimeout;

window.onload = function() {
	if (Enabler.isInitialized()) {
		enablerInitHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT,enablerInitHandler);
	}
}

function enablerInitHandler() {
	//createBorder();//this happens in toggleClass();
	preloadFonts();
	politeLoad();
}
function politeLoad() {
	if (Enabler.isPageLoaded()) {
		pageLoadedHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
	}
}
function pageLoadedHandler() {
	if (Enabler.isVisible()) {
		testLoad();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, testLoad);
	}
}
var loadedItems = 2;
function preloadFonts() {
	if(typeof googleFonts !== 'undefined'){
		WebFontConfig = {
			google: { families: googleFonts },
			active: testLoad,
			fontinactive: function(familyName, fvd) { console.log("Warning: font " + familyName + " could not be loaded."); }
		};
		(function(d) {
			var wf = d.createElement('script'), s = d.scripts[0];
			wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
			s.parentNode.insertBefore(wf, s);
		})(document);
	}else{testLoad();}
}
function testLoad(){
	loadedItems--;
	if(loadedItems <= 0){ adVisibilityHandler(); }
}
var testIsMobile = {
  Android: function() { return navigator.userAgent.match(/Android/i);},
  BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
  iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
  Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
  Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
  any: function() {return (testIsInApp.any() == true ? false : (testIsMobile.Android() || testIsMobile.BlackBerry() || testIsMobile.iOS() || testIsMobile.Opera() || testIsMobile.Windows()) == null ? false : true);}
};
var testIsInApp = {
	any: function() { return studio.common.Environment.hasType(studio.common.Environment.Type.IN_APP); }
}
function testIsDesktop() {
	return !(testIsInApp.any() || testIsMobile.any());
}
function adVisibilityHandler() {
	console.log("adVisibilityHandler");
	var str = "***************\nWARNING!\n"
	str += "As of 1.4.2017\n"
	str += "in-app Android and iOS orientation getMode() is incorrect.\n"
	str += "In-app iOS orientation getDegrees() is incorrect.\n***************"
	console.log(str)
	
	isInApp = testIsInApp.any();
	isMobile = testIsMobile.any();
	isDesktop = testIsDesktop();
	
	thisConfiguration = (isDesktop ? configuration.desktop : (isMobile ? configuration.mobile : configuration.inapp));
	thisConfiguration.allowPortrait = (thisConfiguration.layout.indexOf("portrait") >= 0 ? true : false);
	thisConfiguration.allowLandscape = (thisConfiguration.layout.indexOf("landscape") >= 0 ? true : false);
	
	console.log("configuration:","\n\ttreatment:",thisConfiguration.treatment, "\n\tlayout:",thisConfiguration.layout, "\n\tmax scale:",thisConfiguration.maxScale,"\n\tallow portrait:",thisConfiguration.allowPortrait,"\n\tallow landscape:",thisConfiguration.allowLandscape );
	
	//fullscreen
	Enabler.addEventListener( studio.events.StudioEvent.FULLSCREEN_SUPPORT, fullscreenSupportHandler);
	Enabler.addEventListener( studio.events.StudioEvent.FULLSCREEN_DIMENSIONS, fullscreenDimensionsHandler);
	Enabler.addEventListener( studio.events.StudioEvent.FULLSCREEN_EXPAND_START, expandStartHandler);
	Enabler.addEventListener( studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START, collapseStartHandler);
	Enabler.addEventListener( studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH, expandFinishHandler);
	Enabler.addEventListener( studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, collapseFinishHandler);
	Enabler.addEventListener( studio.events.StudioEvent.ORIENTATION, orientationChange);
	/*if(isDesktop == true) { window.addEventListener("resize",windowResize); }*/
	
	// Enabler.setUseCustomClose(true); 	
	
	console.log("isInApp",isInApp,"isMobile",isMobile,"isDesktop",isDesktop);
	
	Enabler.queryFullscreenSupport();		
	
	setExpand();
	init();
	animationStartTime = new Date().getTime();
	toggleClass('expand', 'collapse');
	startCollapse();
}
function fullscreenSupportHandler(e){
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	fullscreenIsSupported = e.supported;	
	Enabler.queryFullscreenDimensions();
}
function fullscreenDimensionsHandler(e){
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	fullscreenDimensions.width = e.width;
	fullscreenDimensions.height =e.height;
	
	fullscreenDimensions.longSide = Math.max(e.width,e.height);
	fullscreenDimensions.shortSide = Math.min(e.width,e.height);
	updateDimensionsCont();
}
function updateDimensions(){
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	Enabler.queryFullscreenDimensions();
}
function updateDimensionsCont(){
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	isPortrait = (getOrientationMode() == "landscape" ? false : true);
	updateDeviceInfo();
}
function getOrientationMode(){
	var returnValue;
	var currentOrientationObj = Enabler.getOrientation();
	returnValue = currentOrientationObj.getMode();
	if(returnValue == "portrait" && thisConfiguration.allowPortrait == false) {
		returnValue = "landscape";
	}
	if(returnValue == "landscape" && thisConfiguration.allowLandscape == false) {
		returnValue = "portrait";
	}
	console.log("getOrientationMode()",returnValue);
	return returnValue;
}
/*
function windowResize(){
	if(isExpanded == true) {requestManualCollapse();}
	//wait for resizing to stop
	clearTimeout(windowResizeTimeout);
	windowResizeTimeout = setTimeout(orientationChange,100);
}
*/
function orientationChange(){
	console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	//sometimes fired on collapse
	updateDimensions();
    requestManualCollapse();
}

function setExpand() {
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	bannerID = document.getElementsByTagName('body')[0].id;
    var matches = bannerID.match(/[0-9 , \.]+/g);
    c_stageWidth = parseInt(matches[0]);
    c_stageHeight = parseInt(matches[1]);
	
	//here's the trick
	e_p_stageWidth = parseInt(thisConfiguration.allowPortrait == true ? matches[2] : matches[4]);
    e_p_stageHeight = parseInt(thisConfiguration.allowPortrait == true ? matches[3] : matches[5]);
	e_l_stageWidth = parseInt(thisConfiguration.allowLandscape == true ? matches[4] : matches[2]);
    e_l_stageHeight = parseInt(thisConfiguration.allowLandscape == true ? matches[5] : matches[3]);
	
	console.log(e_p_stageWidth,e_p_stageHeight,e_l_stageWidth,e_l_stageHeight)
	
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.collapseShared { overflow: hidden; width:'+c_stageWidth+'px; height:'+ c_stageHeight+'px; }';
	document.getElementsByTagName('head')[0].appendChild(style);
	
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.expandPortraitShared { overflow: hidden; width:'+e_p_stageWidth+'px; height:'+ e_p_stageHeight+'px; }';
	document.getElementsByTagName('head')[0].appendChild(style);
	
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.expandLandscapeShared { overflow: hidden; width:'+e_l_stageWidth+'px; height:'+ e_l_stageHeight+'px; }';
	document.getElementsByTagName('head')[0].appendChild(style);
	
	elem = document.querySelector("#cover")
	elem.style.top = "0px";
    elem.style.left = "0px";
	elem.style.width = c_stageWidth + "px";
	elem.style.height = c_stageHeight + "px";
	
	elem = document.querySelector("#collapsePanel")
	elem.style.top = "0px";
    elem.style.left = "0px";
	elem.style.width = c_stageWidth + "px";
	elem.style.height = c_stageHeight + "px";
	
	elem = document.querySelector("#expandPortraitPanel")
	elem.style.top = "0px";
    elem.style.left = "0px";
	elem.style.width = e_p_stageWidth + "px";
	elem.style.height = e_p_stageHeight + "px";
	
	elem = document.querySelector("#expandLandscapePanel")
	elem.style.top = "0px";
    elem.style.left = "0px";
	elem.style.width = e_l_stageWidth + "px";
	elem.style.height = e_l_stageHeight + "px";
	
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.collapseViewport { top:0px; left:0px; width:'+c_stageWidth+'px; height:'+ c_stageHeight+'px; }';
	document.getElementsByTagName('head')[0].appendChild(style);
}
function actionClickHandler(e) {
	var target = e.toElement || e.relatedTarget || e.target || function () { throw "Failed to attach an event target!"; }
	getOrientationMode();
	(isExpanded == true ? exitHandler(e) : requestExpand() );
}
function requestManualCollapse(){
	Enabler.requestFullscreenCollapse(); 
	TweenMax.set([getElem("cover"),getElem("collapseButton")],{autoAlpha:0});
	TweenMax.set([shared,cover,viewport,collapsePanel,scaleHolder,border], {autoAlpha:1});
    updateDeviceInfo();
    startCollapseTimeline();
}
function requestExpand(){
	Enabler.requestFullscreenExpand(); 
	TweenMax.set([getElem("cover"),getElem("collapseButton")],{autoAlpha:0});
}

function toggleClass(from, to) {
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	updateDimensions();
	
	if(from == "expand") {from = "expand" + (isPortrait == true ? "Portrait" : "Landscape") };
	if(to == "expand") {to = "expand" + (isPortrait == true ? "Portrait" : "Landscape") };
	console.log("--? isPortrait",isPortrait, "to",to,"from",from);
	
	var viewportClassName;
	if(to=="collapse"){
		createBorder(c_stageWidth,c_stageHeight);
		elem = document.querySelector("#hotspot")
		elem.style.width = c_stageWidth + "px";
		elem.style.height = c_stageHeight + "px";
		viewportClassName = "collapseViewport";
	} else {
		if(isPortrait == true){
			createBorder(e_p_stageWidth,e_p_stageHeight);
			elem = document.querySelector("#hotspot")
			elem.style.width = e_p_stageWidth + "px";
			elem.style.height = e_p_stageHeight + "px";
		} else {
			createBorder(e_l_stageWidth,e_l_stageHeight);
			elem = document.querySelector("#hotspot")
			elem.style.width = e_l_stageWidth + "px";
			elem.style.height = e_l_stageHeight + "px";
		}
		viewportClassName = "expandViewport";
		
		
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '.expandViewport { width:'+fullscreenDimensions.width+'px; height:'+fullscreenDimensions.height+'px; }';
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	getElem("shared").className = to + "Shared";
	getElem("viewport").className = viewportClassName;
	try{ getElem("isi").className = to + "ISI"; } catch(er) { /*banner may not have an ISI*/ };
	
	TweenMax.set(getElem("expandPortraitPanel"),{autoAlpha:0});
	TweenMax.set(getElem("expandLandscapePanel"),{autoAlpha:0});
	
	TweenMax.set(getElem(from + "Panel"),{autoAlpha:0});
	TweenMax.set(getElem(to + "Panel"),{autoAlpha:1, onComplete:transitionComplete});
	TweenMax.set(shared,{top:getElem("viewport").offsetTop, left:getElem("viewport").offsetLeft});
		
	if(to=="collapse"){
		TweenMax.set(scaleHolder,{scale:1,left:0,top:0});
		console.log("scaled collapse 1");
		startCollapse();
	} else {
		if(isPortrait == true){			
			desiredScale = getDesiredScale();
			var xMove = (fullscreenDimensions.width - (e_p_stageWidth*desiredScale))/2;
			var yMove = (fullscreenDimensions.height - (e_p_stageHeight*desiredScale))/2;
			TweenMax.set(scaleHolder,{scale:desiredScale,transformOrigin:"0px 0px",left:xMove,top:yMove});			
		} else {
			desiredScale = getDesiredScale();
			var xMove = (fullscreenDimensions.width - (e_l_stageWidth*desiredScale))/2;
			var yMove = (fullscreenDimensions.height - (e_l_stageHeight*desiredScale))/2;
			TweenMax.set(scaleHolder,{scale:desiredScale,transformOrigin:"0px 0px",left:xMove,top:yMove});
		}
		
		startExpand();
	}
	try { TweenMax.set(isiTextHolder,{width:getElem("isi").offsetWidth, height:getElem("isi").offsetHeight-getElem("isiHeader").offsetHeight}); } catch(er){/*banner may not have an ISI*/};
}

function getDesiredScale() {
	var returnValue = 1;
	if(thisConfiguration.treatment == "scale"){
		if(isPortrait == true){
			returnValue = Math.min( (fullscreenDimensions.width/e_p_stageWidth), (fullscreenDimensions.height/e_p_stageHeight), (thisConfiguration.maxScale > 0 ? thisConfiguration.maxScale : 10000) );
		} else {//landscape
			returnValue = Math.min( (fullscreenDimensions.width/e_l_stageWidth), (fullscreenDimensions.height/e_l_stageHeight), (thisConfiguration.maxScale > 0 ? thisConfiguration.maxScale : 10000) );
		}
	}
	console.log("scale",desiredScale,"dims",fullscreenDimensions.width+"x"+fullscreenDimensions.height);
	return returnValue;
}

function expandStartHandler() {
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	toggleClass('collapse', 'expand');	
}

function collapseStartHandler() {
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	TweenMax.set(getElem("cover"),{autoAlpha:0});
	getElem("viewport").className = getElem("viewport").className.replace(/ dir-[trbl]{2}/, '');
	toggleClass('expand', 'collapse');
	
}
function transitionComplete() {
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	isExpanded == true ? Enabler.finishFullscreenCollapse() : Enabler.finishFullscreenExpand();
}
function collapseFinishHandler(){
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	isExpanded = false;
	collapsedComplete();
	TweenMax.set(getElem("cover"),{autoAlpha:1});
	TweenMax.set(getElem("collapseButton"),{autoAlpha:0});
}
function expandFinishHandler(){
	//console.log("--> "+arguments.callee.name+"("+Array.prototype.slice.call(arguments)+")");
	isExpanded = true;
	expandComplete();
	if(isInApp == false ) { TweenMax.set(getElem("collapseButton"),{autoAlpha:1, top:0, left:0}); }
	TweenMax.set(getElem("cover"),{autoAlpha:1, top:0, left:0});
}
