	//peer to peer communication
			var mypeerid = null;
			var peer = null;
			var connection = null;
			var mousePosX = 700;
			var otherPosX = 400;
			
			var init = function() {
				//peer = new Peer({key: 'uohu08l7r6swcdi'});
				noLoop();
				peer = new Peer({host: '104.131.82.13', port: 9000, path: '/'});
				
				peer.on('open', function(id) {
				  console.log('My peer ID is: ' + id);
				  mypeerid = id;
				  document.getElementById('peerId').innerHTML = 'My peer ID is: ' + mypeerid;
				});
				
				peer.on('connection', function(conn) {
					connection = conn;
					connection.on('open', function() {
						document.getElementById('chatlog').innerHTML += "Connection Established";
						loop();
					});
					
					connection.on('data', function(data) {
						otherPosX = data.x;
					});
				});

				document.body.addEventListener('mousemove', function(evt) {

					connection.send({x: evt.clientX});
					mousePosX = evt.clientX;
					// connection.send({x: evt.clientX, y: evt.clientY});
					//console.log("sending: " + {x: evt.clientX, y: evt.clientY})
				});				
			};	
			
			var sendmessage = function() {
				connection.send(document.getElementById('chat').value);
				document.getElementById('chat').value = "";
			};

			var placecall = function() {
				connection = peer.connect(document.getElementById('other_peer_id').value, {reliable: false});
				connection.on('open', function(data) {
					document.getElementById('chatlog').innerHTML += "Connection Established";
					loop();
				});

				connection.on('data', function(data) {
					otherPosX = data.x;

				});
			};

			window.addEventListener('load', init);

			
//for the pong game
var rectWidth = 600;
var rectHeight = 400;
var lotusWidth = 100;
var lotusHeight = 25;



var r = 20; //radius of buddha's head
var buddha;
var speed = 1;
var speedLimit = 15;

var k = 5; //k= a range to compansate speed+framerate
//var rectFill=color(255);
//boolean fail;

function setup(){
	createCanvas(displayWidth, displayHeight);
	buddha = new Buddha();
	buddha1 = new Buddha();
	buddha1.moveToRight();
}

function draw(){
	background(255);
	
	//red frame
	stroke(0);
	strokeWeight(5);
	//fill(rectFill);
	rect(displayWidth/2-rectWidth/2,0,rectWidth,rectHeight);

	//make a lotus seat, made of an image
	// the lotus seat goes with MouseX
	fill(255, 0, 0);
	noStroke();
	rect(mousePosX-lotusWidth/2,rectHeight-lotusHeight/2,lotusWidth,lotusHeight);
	// image(lotusPic,mouseX-lotusWidth/2,rectHeight-lotusHeight/2,lotusWidth,lotusHeight);
	rect(otherPosX-lotusWidth/2,rectHeight-lotusHeight/2,lotusWidth,lotusHeight);

	buddha.display();
	buddha1.display();
	buddha.move();
	buddha1.move();
	buddha.bounce();
	buddha1.bounce();
}

function Buddha(){
	// this.centerX = random(displayWidth/2-rectWidth/2+r, displayWidth/2+rectWidth/2-r); //head randomly in the frame
	this.centerX = displayWidth/2;
	this.centerY = r; //upper half, so people have time to react when start
	this.speedX = 2;
	this.speedY = 2;
}

// Buddha.prototype.speedup = function(){
// 	this.speedX += increaseSpeed;
// 	this.speedY += increaseSpeed;
// }

Buddha.prototype.display = function (){
	//make a buddha head, made of an image
	ellipseMode(CORNER);
	fill(0, 255, 255);
	noStroke();
	ellipse(this.centerX-r, this.centerY-r, 2*r, 2*r);
}

Buddha.prototype.moveToRight = function (){
	this.centerX = displayWidth/2 + 50;
	this.centerY = r + 29;
}

Buddha.prototype.move = function() {
	//the buddha head moves
	this.centerX=this.centerX+this.speedX;
	this.centerY=this.centerY+this.speedY;

}

Buddha.prototype.bounce = function(){
	//touching right 
	if (this.centerX>=(displayWidth/2)+(rectWidth/2)-r){
		if(this.speedX>0){
			this.speedX=-(this.speedX+speed);
		}else{
			this.speedX=-(this.speedX-speed);
		}
	}

	//touching left
	if (this.centerX<=(displayWidth/2)-(rectWidth/2)+r){
		// this.speedX=-this.speedX;
		if(this.speedX>0){
			this.speedX=-(this.speedX+speed);
		}else{
			this.speedX=-(this.speedX-speed);
		}
	}

	//touching top 
	if (this.centerY<=r){
		// this.speedY=-this.speedY;
		if(this.speedY>0){
			this.speedY=-(this.speedY+speed);
		}else{
			this.speedY=-(this.speedY-speed);
		}
	}

	//touching bottom border while within lotusWidth
	if (this.centerY>=rectHeight-(lotusHeight/2)-r-k   &&
		this.centerY<=rectHeight-(lotusHeight/2)-r+k  &&   
		this.centerX>=mousePosX-(lotusWidth/2) && 
		this.centerX<=mousePosX+(lotusWidth/2)){
		// this.speedY=-this.speedY;
		if(this.speedY>0){
			this.speedY=-(this.speedY+speed);
		}else{
			this.speedY=-(this.speedY-speed);
		}
	}

	else if (this.centerY>=rectHeight-(lotusHeight/2)-r-k   &&
		this.centerY<=rectHeight-(lotusHeight/2)-r+k  &&   
		this.centerX>=otherPosX-(lotusWidth/2) && 
		this.centerX<=otherPosX+(lotusWidth/2)){
		// this.speedY=-this.speedY;
		if(this.speedY>0){
			this.speedY=-(this.speedY+speed);
		}else{
			this.speedY=-(this.speedY-speed);
		}
	}

	//if buddha y below rect bottom, rect turns red
	if (this.centerY>rectHeight-(lotusHeight/2)-r+k) {
		fill(255,0,0);
		rect(0,0,displayWidth,displayHeight);
	}

	if(this.speedX < -15){
		this.speedX = -15
	}
	if(this.speedY < -15){
		this.speedY = -15
	}
	if(this.speedX > speedLimit){
		this.speedX = speedLimit
	}
	if(this.speedY > speedLimit){
		this.speedY = speedLimit
	}

}






