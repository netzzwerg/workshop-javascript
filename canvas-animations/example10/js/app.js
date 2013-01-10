/*global  window,document,setInterval */

var MAX_ACTORS = 60;
var WIDTH = 800;
var HEIGHT = 600;
var FPS = 60;
var actors = [];
var context = null;
var cons = null;

particleImage = new Image();
particleImage.src = 'img/particle.png';

// STAGE Object
function Stage() {
    this.color = "#000000";
    this.width = WIDTH;
    this.height = HEIGHT;
    this.maxActors = MAX_ACTORS;
}

Stage.prototype = {

    render: function() {
        this.clear();
        actors.push(new Particle(cons));
        for (var i = 0; i < this.maxActors; i++) {
            actors[i].draw();
            actors[i].calc();
        }
        actors.shift(); 
    },

    clear: function() {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }

};

function Constr() {
    this.posX = WIDTH / 2; 
	this.posY = HEIGHT / 2;  
	this.velY = 0.01; 
	this.minVelX = -0.5;
	this.maxVelX = 0.5;
	this.shrink = 1.04; 
	this.minSizeFaktor = 0.1;
	this.maxSizeFaktor = 0.2;
	this.maxSize = 1.51;
	this.shimmer = false;	
	this.drag = 0.96; 
	this.gravity = -0.21;
	this.minAlpha = 0.21;
	this.maxAlpha = 0.31; 
	this.fade = 0.005; 
	this.spin = 0.00; 
	this.rotation = 0.00; 
	this.compositeOperation = 'source-over';  
}


// Particle Object
function Particle(c) {
    this.posX = c.posX; 
	this.posY = c.posY; 
	this.velX = randomRange(c.minVelX,c.maxVelX); 
	this.velY = c.velY; 
	this.shrink = c.shrink; 
	this.size = randomRange(c.minSizeFaktor,c.maxSizeFaktor); 
	this.maxSize = c.maxSize;
	this.shimmer = c.shimmer;	
	this.drag = c.drag; 
	this.gravity = c.gravity; 
	this.alpha = randomRange(c.minAlpha,c.maxAlpha); 
	this.fade = c.fade; 
	this.spin = c.spin; 
	this.rotation = c.rotation; 
	this.compositeOperation = c.compositeOperation;
	this.img = particleImage;
}

Particle.prototype = {

    calc: function() {
		this.velX *= this.drag; 
		this.velY *= this.drag;
		this.velY += this.gravity; 
		this.posX += this.velX;
		this.posY += this.velY; 
		this.size *= this.shrink;
		if((this.maxSize>0) && (this.size>this.maxSize))
			this.size = this.maxSize; 
		this.alpha -= this.fade; 	
		if(this.alpha<0) this.alpha = 0; 
		this.rotation += this.spin;
    },

    draw: function() {
        var c = context;

	if(this.alpha === 0) return;
	
	c.save(); 
	c.translate(this.posX, this.posY);
	var s = this.shimmer ? this.size * Math.random() : this.size; //this.shimmer ? this.size * 0 : this.size; 
	c.scale(s,s);
	c.rotate(this.rotation * Math.PI / 180);
	c.translate(this.img.width*-0.5, this.img.width*-0.5);
	c.globalAlpha = this.alpha; 
	c.globalCompositeOperation = this.compositeOperation;
	c.drawImage(this.img,0,0);
	c.restore();

    }
};

function randomRange(min, max) {
	return ((Math.random()*(max-min)) + min); 
}

function init() {

    var canvas = document.getElementById('canvas');
    var stage = new Stage();
    var gui = new dat.GUI();
    var stats = new Stats();
    cons = new Constr();
        
    window.document.body.appendChild( stats.domElement );
    
    //gui.remember(stage);
    //gui.remember(actor);    

    // create set of actors
    for (var i = 0; i < MAX_ACTORS; i++) {
        actors.push(new Particle(cons));
    }


    var f1 = gui.addFolder('stage');
    f1.add(stage, 'width');
    f1.add(stage, 'height');
    f1.add(stage, 'maxActors');
    f1.addColor(stage, 'color');
    
    var actor = cons;
    var f2 = gui.addFolder('particle');
f2.add(actor, 'posX', 0, WIDTH);
f2.add(actor, 'posY', 0, HEIGHT);
f2.add(actor, 'velY', -5, 5);
f2.add(actor, 'minVelX', -5, 5);
f2.add(actor, 'maxVelX', 0 ,1);
f2.add(actor, 'shrink', 0 ,3);
f2.add(actor, 'minSizeFaktor', 0 ,1);
f2.add(actor, 'maxSizeFaktor', 0 ,1);
f2.add(actor, 'maxSize', 0 ,3).step(0.1);
f2.add(actor, 'shimmer');
f2.add(actor, 'drag', 0 ,1).step(0.1);
f2.add(actor, 'gravity', -2 ,2).step(0.1);
f2.add(actor, 'minAlpha', 0 ,1).step(0.1);
f2.add(actor, 'maxAlpha', 0 ,1).step(0.1);
f2.add(actor, 'fade', 0, 0.05).step(0.001);
f2.add(actor, 'spin').step(0.1);
f2.add(actor, 'rotation').step(0.1);
f2.add(actor, 'compositeOperation');



    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    context = canvas.getContext("2d");

    function tick(){
        stage.render();
        stats.update();
    }

    setInterval(tick, 1000 / FPS);

}

window.onload = init;