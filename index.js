//create two canvas, one for background picture, and one for animation effect.
canvas = document.getElementById('canvas_bg')
canvas_bg.width = window.innerWidth;
canvas_bg.height = window.innerHeight;

canvas_am = document.getElementById('canvas_am');
canvas_am.width = window.innerWidth;
canvas_am.height = window.innerHeight;



var c1 = canvas_bg.getContext('2d');


var c2 = canvas_am.getContext('2d');

//load picture into the background canvas.
var background = new Image();
background.src = "rocky-mountain-1742928.jpg";



window.addEventListener('resize', function() {
	canvas_am.width = window.innerWidth;
	canvas_am.height = window.innerHeight;
	canvas_bg.width = window.innerWidth;
	canvas_bg.height = window.innerHeight;
	init_bg();
	init_am();
})


//create color array for circles to pick color from.
var colorArray = [
	'#F2ECD8',
	'#A69076',
	'#F2A35E',
	'#A65A2E',
	'#262626'
];


//function to draw circles.
function Circle(x,y,r,radians) {
	this.x = x; //horizontal position of the circle.
	this.y = y;	//vertical position of the circle.
	this.r = r;	//radius of the circle.
	this.velocity = 0.001; //rotation speed of the circle.
	this.radians = radians; //rotation radians of the circle.
	this.color = colorArray[Math.floor(Math.random()*colorArray.length)]; //randomly pick the color from colorArray.


	//draw the circle.
	this.draw = function() {
		c2.beginPath();
		c2.arc(this.x, this.y, this.r, 0, Math.PI*2, 1);
		c2.fillStyle = this.color;
		c2.fill();
		c2.closePath();
	}

	//keep updating the position/status of the circle to create animation.
	this.update = function() {
		
		this.radians += this.velocity;
		if (this.radians >= 0 * Math.PI && this.radians <= Math.PI*2 - Math.PI) {
			this.velocity += 0.001;
		}

		else if (this.radians >= Math.PI * 2 - Math.PI && this.radians <= Math.PI * 3 - Math.PI){
			this.velocity -= 0.001;
		}

		this.x = x + Math.cos(this.radians) * 100;
		this.y = y + Math.sin(this.radians) * 100;
		this.draw(); //keep updating the motion of the circles by drawing it at each frame.


	}

}

var circleArray = []; //array for creating numerous circles
var numberOfCircles = 10;


for (var i = 0; i < numberOfCircles; ++i) {
	circleArray.push(new Circle(canvas.width/2, canvas.height/2, 5, 10*i*Math.PI/180));
}


function animate() {
	requestAnimationFrame(animate);
	c2.clearRect(0,0,canvas.width,canvas.height);	//clear the frame at before circle.update() is called so the previous circles will not stay on the canvas.
	for (var i = 0; i < circleArray.length; ++i) {
		circleArray[i].update();
	}
}

animate();


// function for clock
function Clock () {
	//getting the time of the clock.
	var time = new Date();
	var date = time.getDate();
	var year = time.getFullYear().toString();

	var month = time.getMonth();
	var montharr =["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]; //convert month numbers to letters
	month=montharr[month];

	var day = time.getDay();
	var hours = time.getHours().toString();

	var dayarr =["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"]; //convert day numbers to letters
	day=dayarr[day];


	var minutes = time.getMinutes().toString();
	var seconds = time.getSeconds().toString();

	//if digit of time less than 2, add an 0 in front of it to make it consistent.
	if (hours.length < 2) {
		hours = '0' + hours;
	}

	if (minutes.length < 2) {
		minutes = '0' + minutes;
	}

	if (seconds.length < 2) {
		seconds = '0' + seconds;
	}

	//put clock generated into DOM.
	document.getElementById("date").innerHTML=day+" "+date+" "+month+" "+year;
	document.getElementById("clock").innerHTML=hours+":"+minutes+":"+seconds; 
}

function init_bg() {
	//load picture into the background canvas every time when init_bg is called.
	var background = new Image();
	background.src = "https://images.pexels.com/photos/1742928/pexels-photo-1742928.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=4926&w=3284";

	background.onload = function() {
		c1.drawImage(background,0,0,background.width, background.height,
								0,0,canvas_bg.width, canvas_bg.height);
	}

	Clock();
	setInterval(Clock, 1000); //set refresh rate for 1s, so the time can update every second.
}

init_bg();

function init_am() {
	var circleArray = []; //array for creating numerous circles
	var numberOfCircles = 10;
	for (var i = 0; i < numberOfCircles; ++i) {
		circleArray.push(new Circle(canvas.width/2, canvas.height/2, 5, 10*i*Math.PI/180));
	}


	function animate() {
		requestAnimationFrame(animate);
		c2.clearRect(0,0,canvas.width,canvas.height);	//clear the frame at before circle.update() is called so the previous circles will not stay on the canvas.
		for (var i = 0; i < circleArray.length; ++i) {
			circleArray[i].update();
		}
	}

	animate();
}






