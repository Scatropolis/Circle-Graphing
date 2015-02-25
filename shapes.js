var rot2Slider;

window.addEvent('domready', function(){
	// NUMBER OF CIRCLES
	var ccSlider = new Slider($('CircleCountSlider'), $('CircleCountSlider').getElement('.knob'), { steps: 360, range: [0], wheel: 1,
		onChange: function(value){
			circlecount = value;
			CircleShape();
			$('CircleCountLabel').innerHTML = "Number of Dots* = " + value;
		}
	}).set(circlecount);
	
//SHAPE 01 (OUTPUT)
	
	/*// SHAPE 01 - Step
	var s1Slider = new Slider($('Step1Slider'), $('Step1Slider').getElement('.knob'), { steps: 360, range: [0], wheel: 1,
		onChange: function(value){
			shape1.step = value;
			CircleShape();
			$('Step1Label').innerHTML = "Step = " + value;
		}
	}).set(shape1.step);*/
	
	// SHAPE 01 - Rotation
	var rot1Slider = new Slider($('Rotation1Slider'), $('Rotation1Slider').getElement('.knob'), { steps: 360, range: [0], wheel: 1,		
		onChange: function(value){
			shape1.rotation = value - 180;
			CircleShape();
			$('Rotation1Label').innerHTML = "Rotation* = " + (value - 180);
		}
	}).set(shape1.rotation + 180);

	// SHAPE 01 - Radius
	var rad1Slider = new Slider($('Radius1Slider'), $('Radius1Slider').getElement('.knob'), { steps: 600, range: [0], wheel: 1,		
		onChange: function(value){
			shape1.radius = value;
			CircleShape();
			$('Radius1Label').innerHTML = "Radius* = " + value;
		}
	}).set(shape1.radius);
	
	// SHAPE 01 - Radius Sine Wave
	var sin1Slider = new Slider($('Sine1Slider'), $('Sine1Slider').getElement('.knob'), { steps: 300, range: [0], wheel: 1,
		onChange: function(value){
			shape1.sine = value;
			CircleShape();
			$('Sine1Label').innerHTML = "Radius Sine Distort* = " + value;
		}
	}).set(shape1.sine);
	
//SHAPE 02 (INPUT)
	
	// SHAPE 02 - Step
	var s2Slider = new Slider($('Step2Slider'), $('Step2Slider').getElement('.knob'), { steps: 360, range: [0], wheel: 1,
		onChange: function(value){
			shape2.step = value;
			CircleShape();
			$('Step2Label').innerHTML = "Step = " + value;
		}
	}).set(shape2.step);
	
	// SHAPE 02 - Rotation
	var rot2Slider = new Slider($('Rotation2Slider'), $('Rotation2Slider').getElement('.knob'), { steps: 360, range: [0], wheel: 1,		
		onChange: function(value){
			shape2.rotation = value - 180;
			//shapeAnimate.rotation = value;
			CircleShape();
			$('Rotation2Label').innerHTML = "Rotation = " + (value - 180);
		}
	}).set(shape2.rotation + 180);

	// SHAPE 02 - Radius
	var rad2Slider = new Slider($('Radius2Slider'), $('Radius2Slider').getElement('.knob'), { steps: 600, range: [0], wheel: 1,
		onChange: function(value){
			shape2.radius = value;
			CircleShape();
			$('Radius2Label').innerHTML = "Radius* = " + value;
		}
	}).set(shape2.radius);
	
	// SHAPE 02 - Radius Sine Wave
	var sin2Slider = new Slider($('Sine2Slider'), $('Sine2Slider').getElement('.knob'), { steps: 300, range: [0], wheel: 1,		
		onChange: function(value){
			shape2.sine = value;
			CircleShape();
			$('Sine2Label').innerHTML = "Radius Sine Distort* = " + value;
		}
	}).set(shape2.sine);
	
//ANIMATION
	
	// ANIMATION DELAY
	var adSlider = new Slider($('SpeedSlider'), $('SpeedSlider').getElement('.knob'), { steps: 100, range: [1], wheel: 1,		
		onChange: function(value){
			animateSpeed = value;
			$('SpeedLabel').innerHTML = "Delay* = " + value + "ms";
			UpdateLink();
			
			if (rotateBool)
			{
				clearInterval(animateId);
				Animate();			
			}
		}
	}).set(animateSpeed);
	
	// SHAPE 01 - ANIMATION STEP
	var anim1Slider = new Slider($('AnimationStep1Slider'), $('AnimationStep1Slider').getElement('.knob'), { steps: 72, range: [0], wheel: 1,
		onChange: function(value){
			shape1.animationStep = value - 36;
			$('AnimationStep1Label').innerHTML = "Input Step* = " + (value - 36);
			UpdateLink();
			
			//if (rotateBool || stepbool || radiusbool)
			if (rotateBool)
			{
				//shape2 = shapeAnimate
				clearInterval(animateId);
				Animate();
			}
		}
	}).set(shape1.animationStep + 36);	
	
	// SHAPE 02 - ANIMATION STEP
	var anim2Slider = new Slider($('AnimationStep2Slider'), $('AnimationStep2Slider').getElement('.knob'), { steps: 72, range: [0], wheel: 1,
		onChange: function(value){
			shape2.animationStep = value - 36;
			$('AnimationStep2Label').innerHTML = "Output Step* = " + (value - 36);
			UpdateLink();
			
			//if (rotateBool || stepbool || radiusbool)
			if (rotateBool)
			{
				//shape2 = shapeAnimate
				clearInterval(animateId);
				Animate();
			}
		}
	}).set(shape2.animationStep + 36);	
});

//OTHER

function Point(x, y) { this.x = x; this.y = y; }
function Shape(step, rotation, radius, sine, animationStep)
{
	this.step = step;
	this.rotation = rotation;
	this.radius = radius;
	this.sine = sine;
	this.animationStep = animationStep;
}

if(window.location.search != "")
	var args = window.location.search.substr(1).split(",").map( function(x){ return parseInt(x); } );
else
	var args = [1,0,300,0,0,2,0,300,0,1,25]; //[1,0,161,140,0,1,0,36,260,1,40];

shape1 = new Shape(args[0], args[1], args[2], args[3], args[4]);
shape2 = new Shape(args[5], args[6], args[7], args[8], args[9]);
animateSpeed = args[10];
rotateBool = false;
animateId = 0;
circlecount = 360;


function CircleShape() 
{
	//if (!rotateBool) 
	UpdateLink();
	
	gfx.beginPath();
	//gfx.strokeStyle = 'rgb(' + rota % 360 + ',' + rota % 360 + ',' + rota % 360 + ')';
	
	step1 = 0;
	step2 = 0;
	dyntable = "<tr><th>x</td><th>y</td></tr>";
	for (i = 0; i < circlecount; i++)
	{
		//Sine Distort
		newradiusS1 = Math.sin(i) * shape1.sine + shape1.radius;
		newradiusS2 = Math.sin(i) * shape2.sine + shape2.radius;
		
		dot1 = step1 + shape1.rotation;
		dot2 = step2 + shape2.rotation;
	
		gfx.moveTo(CircleCoordX(dot1, newradiusS1), CircleCoordY(dot1, newradiusS1));
		gfx.lineTo(CircleCoordX(dot2, newradiusS2), CircleCoordY(dot2, newradiusS2));
		
		//Dynamic Table
		if (i < 20)
		{
			start = step1 + shape1.rotation
			dot1 = Math.round((dot1 * circlecount / 360)%circlecount);
			dot2 = Math.round((dot2 * circlecount / 360)%circlecount);
			dyntable += "<tr class='data'><td class='data'>" + dot1 + "</td><td>" + dot2 + "</td></tr>";
		}
		
		step1 += shape1.step * (360/circlecount);
		step2 += shape2.step * (360/circlecount);
	}
	document.getElementById('dynamictable').innerHTML = dyntable;
	
	gfx.clearRect(-810,-600,1600,1200);
	gfx.stroke();

	if (rotateBool) 
	{
		shape1.rotation = (shape1.rotation + shape1.animationStep * (360/circlecount)) % 360;
		shape2.rotation = (shape2.rotation + shape2.animationStep * (360/circlecount)) % 360;
		//shapeAnimate.rotation = (shapeAnimate.rotation + animateStep) % 360;
	}
}

function Animate()
{
	if (rotateBool)
	{
		//shapeAnimate = shape2;
		clearInterval(animateId);
		animateId = setInterval('CircleShape()', animateSpeed);
		document.getElementById('RotationAnimate').innerHTML = "Stop";
		//rot2Slider.set(100);
	}
	else
	{
		//shape2 = shapeAnimate;
		clearInterval(animateId);
		document.getElementById('RotationAnimate').innerHTML  = "Go";
	}
}

function CircleCoordX(degree, width) { return width * Math.cos(Math.PI * degree / 180); }
function CircleCoordY(degree, height) {	return height * Math.sin(Math.PI * degree / 180); }
function UpdateLink() { 
	document.getElementById('shapeurl').href = location.href.split("?")[0] + "?" + shape1.step + "," + shape1.rotation + "," + shape1.radius + "," + shape1.sine + "," + shape1.animationStep + "," + shape2.step + "," + shape2.rotation + "," + shape2.radius + "," + shape2.sine + "," + shape2.animationStep + "," + animateSpeed; 
	document.getElementById('equation').innerHTML  = "Equation: y = " + shape2.step + "x + " + shape2.rotation;
}
