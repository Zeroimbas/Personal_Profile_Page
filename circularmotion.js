var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');



var colorArray = [
	'#F2ECD8',
	'#A69076',
	'#F2A35E',
	'#A65A2E',
	'#262626'
];


function Circle (x,y,r,radians) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.velocity = 0.001;
	this.radians = radians;
	this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI*2, 1);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}


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
		this.draw();


	}
}


var circleArray = [];
var numberOfCircles = 10;


for (var i = 0; i < numberOfCircles; ++i) {
	circleArray.push(new Circle(canvas.width/2, canvas.height/2, 5, 10*i*Math.PI/180));
}


function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width,canvas.height);
	for (var i = 0; i < circleArray.length; ++i) {
		circleArray[i].update();
	}
}

animate();
