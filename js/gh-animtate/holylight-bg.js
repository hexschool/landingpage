(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.bglight = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F4BD3C").s().p("AkhKuQiFg5hnhnQhnhng5iFQg6iKAAiYQAAiWA6iLQA5iFBnhnQBnhnCFg5QCKg6CXAAQCXAACKA6QCGA5BnBnQBnBnA5CFQA6CLAACWQAACYg6CKQg5CFhnBnQhnBniGA5QiKA6iXAAQiXAAiKg6g");
	this.shape.setTransform(151.7,151.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FED26D").s().p("AlsNfQiohHiBiCQiCiBhHioQhJiuAAi/QAAi9BJiuQBHioCCiCQCBiCCohHQCuhJC+AAQC+AACuBJQCoBHCCCCQCCCCBHCoQBJCuAAC9QAAC/hJCuQhHCoiCCBQiCCCioBHQiuBJi+AAQi+AAiuhJg");
	this.shape_1.setTransform(151.7,151.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FED26D").s().p("Ah8GZQgziqAAjvQAAjuAziqQA0ipBIAAQBJAAAzCpQA0CqAADuQAADvg0CqQgzCphJAAQhIAAg0ipg");
	this.shape_2.setTransform(151.7,245.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FED26D").s().p("AmYB8QipgzAAhJQAAhICpgzQCqg0DuAAQDwAACpA0QCpAzAABIQAABJipAzQipA0jwAAQjuAAiqg0g");
	this.shape_3.setTransform(58.1,151.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FED26D").s().p("AmYB8QipgzAAhJQAAhICpgzQCpg0DvAAQDwAACpA0QCpAzAABIQAABJipAzQipA0jwAAQjuAAiqg0g");
	this.shape_4.setTransform(245.3,151.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FED26D").s().p("Ah8GZQgziqAAjvQAAjuAziqQA0ipBIAAQBJAAAzCpQA0CqAADuQAADvg0CqQgzCphJAAQhIAAg0ipg");
	this.shape_5.setTransform(151.7,57.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.bglight, new cjs.Rectangle(0.3,0,302.8,302.9), null);


// stage content:
(lib.animate = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// bg-light
	this.instance = new lib.bglight();
	this.instance.parent = this;
	this.instance.setTransform(224.7,153.8,0.921,0.921,0,0,0,151.4,151.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:151.7,scaleX:0.95,scaleY:0.95,rotation:3.9,x:225},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:7.8,y:153.9},0).wait(1).to({scaleX:1.01,scaleY:1.01,rotation:11.7},0).wait(1).to({scaleX:1.04,scaleY:1.04,rotation:15.7,y:154},0).wait(1).to({scaleX:1.07,scaleY:1.07,rotation:19.6,y:153.9},0).wait(1).to({scaleX:1.1,scaleY:1.1,rotation:23.5,y:154},0).wait(1).to({scaleX:1.13,scaleY:1.13,rotation:27.4},0).wait(1).to({scaleX:1.16,scaleY:1.16,rotation:31.3},0).wait(1).to({scaleX:1.19,scaleY:1.19,rotation:35.2,y:154.1},0).wait(1).to({scaleX:1.21,scaleY:1.21,rotation:39.1},0).wait(1).to({scaleX:1.24,scaleY:1.24,rotation:43},0).wait(1).to({scaleX:1.22,scaleY:1.22,rotation:47,x:224.9},0).wait(1).to({scaleX:1.19,scaleY:1.19,rotation:50.9},0).wait(1).to({scaleX:1.16,scaleY:1.16,rotation:54.8},0).wait(1).to({scaleX:1.14,scaleY:1.14,rotation:58.7},0).wait(1).to({scaleX:1.11,scaleY:1.11,rotation:62.6},0).wait(1).to({scaleX:1.08,scaleY:1.08,rotation:66.5,x:224.8},0).wait(1).to({scaleX:1.06,scaleY:1.06,rotation:70.4,y:154.2},0).wait(1).to({scaleX:1.03,scaleY:1.03,rotation:74.3,y:154.1},0).wait(1).to({scaleX:1,scaleY:1,rotation:78.3,x:224.7,y:154.2},0).wait(1).to({scaleX:0.98,scaleY:0.98,rotation:82.2,x:224.8,y:154.1},0).wait(1).to({scaleX:0.95,scaleY:0.95,rotation:86.1,x:224.7},0).wait(1).to({scaleX:0.92,scaleY:0.92,rotation:90},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(310.6,189.4,278.8,278.9);
// library properties:
lib.properties = {
	id: '28ABF641DFD64919A93020F400CE455G',
	width: 450,
	height: 350,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['28ABF641DFD64919A93020F400CE455G'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createHolylightBgjs = createjs||{}, AdobeAn = AdobeAn||{});
var createHolylightBgjs, AdobeAn;