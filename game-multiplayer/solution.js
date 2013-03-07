-- 1 client ---

		render: function() {
			this.clear();

			// draw each actor
			for (var i = 0; i < actors.length; i++) {
				actors[i].calc();
				actors[i].draw();
			}
		},

		clear: function() {
			context.fillStyle = '#000000';
			context.fillRect(0, 0, WIDTH, HEIGHT);
		}

				calc: function() {
			// movement with spring and friction
			var dx = targetX - this.x;
			var dy = targetY - this.y;
			var ax = dx * spring;
			var ay = dy * spring;

			this.vx += ax;
			this.vy += ay;
			this.vx *= friction;
			this.vy *= friction;

			this.x += this.vx;
			this.y += this.vy;
		},

		draw: function() {
			// ball
			context.fillStyle = this.c;
			context.beginPath();
			context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
			context.fill();
		}

				// add event handler
		canvas.addEventListener("click", function(e){
			targetX = e.clientX - canvas.offsetLeft;
			targetY = e.clientY - canvas.offsetTop;
		}, false);


--- 2 server ---

var serverPort    = process.env.PORT || 1337,
      express       = require('express'),
      UUID          = require('node-uuid'),
      verbose       = false,
      app           = express(),
      http          = require('http'),
      server        = http.createServer(app);

/* ------  ------  ------ Express ------  ------  ------ */

  server.listen(serverPort);
  console.log('\t :: Express :: Listening on port ' + serverPort );

  app.get( '/', function( req, res ){
    res.sendfile( __dirname + '/index.html' );
  });

  app.get( '/*' , function( req, res, next ) {
    var file = req.params[0];
    if(verbose) console.log('\t :: Express :: file requested : ' + file);
    res.sendfile( __dirname + '/' + file );
  });



-- 3 socket ---

      sio           = require('socket.io').listen(server);

/* ------  ------  ------ Socket.IO ------  ------  ------ */

  sio.configure(function (){
    sio.set('log level', 0);
    sio.set('authorization', function (handshakeData, callback) {
      callback(null, true); // error first callback style
    });
  });

  sio.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
      console.log(data);
      //socket.emit('message', data);
      sio.sockets.emit('message', data);
    });
  });

<script src="/socket.io/socket.io.js"></script>

		var socket = io.connect('http://localhost:1337');

  		// add event handler
		canvas.addEventListener("click", function(e){
			var targetX = e.clientX - canvas.offsetLeft;
			var targetY = e.clientY - canvas.offsetTop;
			socket.emit('message', { targetX: targetX, targetY: targetY });
			console.log('emit');
		}, false);


	socket.on('message', function (data) {
			console.log(data);
			targetX = data.targetX;
			targetY = data.targetY;
		});


-- 4 working result --


-- 5 socket communication --



			socket.emit('clientMessage', {
				x: targetX,
				y: targetY,
				uid: localUID
			});

		socket.on('connected', function (data) {
			localUID = data.uid;
			for (var prop in data.clients) {
				if( data.clients.hasOwnProperty(prop) ) {
					var client = data.clients[prop];
					var actor = new Actor(client.data.uid);
					if(client.data.uid === localUID) {
						actor.c = '#A6E22E';
					}
					actor.targetX = client.data.x;
					actor.targetY = client.data.y;
					actors.push(actor);
				}
			}
		});

		socket.on('clientConnect', function (data) {
			var actor = new Actor(data.uid);
			actors.push(actor);
		});

		socket.on('clientDisconnect', function (data) {
			for (var i = 0; i < actors.length; i++) {
				if(actors[i].uid === data.uid) {
					actors.splice(i, 1);
				}
			}
		});

		socket.on('clientMessage', function (data) {
			for (var i = 0; i < actors.length; i++) {
				if(actors[i].uid === data.uid) {
					actors[i].setTarget(data.x, data.y);
				}
			}
		});

		socket.on('connect', function () {
			console.log('server');
		});

		socket.on('disconnect', function (data) {
			actors = [];
		});


      clients       = {};

sio.sockets.on('connection', function (socket) {

    newClient(socket);

    socket.on('clientMessage', onClientMessage);
    socket.on('disconnect', onDisconnect);

  });

  function onClientMessage (data) {
    clients[data.uid].data = data;
    sio.sockets.emit('clientMessage', data);
    console.log(' client\t - '.blue, data);
  }

  function onDisconnect () {
    var uid = this.id;
    sio.sockets.emit('clientDisconnect', {uid:uid});
    delete clients[uid];
    console.log(' client\t - '.red + uid + ' disconnected');
  }

  function newClient(socket) {
    var clientUID = socket.id;

    clients[clientUID] = {'data' : {
      'x' : 0,
      'y' : 0,
      'uid': clientUID
    }};

    // tell current connection that it is connected
    socket.emit('connected', {
      'uid' : clientUID,
      'clients' : clients
    });

    // tell other sockets that there is a new client
    socket.broadcast.emit('clientConnect', {
      'uid' : clientUID
    });

    console.log(' client\t - '.green + clientUID + ' connected');
  }



-- 6 refactoring --


	function onStageClick(data, socket) {
		socket.emit('clientMessage', {
			x: data.x,
			y: data.y,
			uid: UID
		});
	}

	function onConnected(data) {
		UID = data.uid;
		_.each(data.clients, function(client, uid){
			var actor = new Actor();
			var color = '#66D9EF';
			if(uid === UID) { color = '#A6E22E'; }
			actor.init(color, uid);
			actor.setPosition(client.data.x, client.data.y);
			this.addActor(actor);
		}, this);
	}

	function onClientConnect(data) {
		var actor = new Actor();
		actor.init('#66D9EF', data.uid);
		this.addActor(actor);
	}

	function onClientDisconnect(data) {
		this.removeActor(data.uid);
	}

	function onClientMessage(data) {
		this.getActor(data.uid).setTarget(data.x, data.y);
	}

	function onDisconnect(data) {
		this.clearActors();
	}



function Actor() {
		this.uid = null;
		this.c = "#FFFFFF"; // color
		this.x = 0;
		this.y = 0;
		this.r = 20; // radius
		this.vx = 5; // velocity x
		this.vy = 5; // velocity y
		this.targetX = 0;
		this.targetY = 0;
		this.animate = false;
		this.spring = 0.005;
		this.friction = 0.95;
	}

	Actor.prototype = {

		init: function(c, uid) {
			this.uid = uid;
			this.c = c; // color
		},

		calc: function() {
			if(this.animate) {
				// movement with spring and friction
				var dx = this.targetX - this.x;
				var dy = this.targetY - this.y;
				var ax = dx * this.spring;
				var ay = dy * this.spring;

				this.vx += ax;
				this.vy += ay;
				this.vx *= this.friction;
				this.vy *= this.friction;

				this.x += this.vx;
				this.y += this.vy;
			} else {
				this.x = this.targetX;
				this.y = this.targetY;
			}
		},

		draw: function(context) {
			// ball
			context.fillStyle = this.c;
			context.beginPath();
			context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
			context.fill();
		},

		setTarget: function(x,y) {
			this.animate = true;
			this.targetX = x;
			this.targetY = y;
		},

		setPosition: function(x,y) {
			this.animate = false;
			this.targetX = x;
			this.targetY = y;
		}
	};

	return Actor;


-- 7 auth server --

// client js

		var onTick = function (callback, time) {
			setTimeout(function () {
				callback();
			}, time);
		};

		function calc() {
			stage.calc();
			onTick(calc, 15);
		}

		onTick(calc, 15);

		function tick() {
			stage.render();
			onFrame(tick);
		}

		onFrame(tick);

// server js 


var Stage = require('./js/module/Stage');
var Actor = require('./js/module/Actor');

var stage = new Stage();


stage.init(800, 600);

// your code


 var onTick = function (callback, time) {
    setTimeout(function () {
     callback();
    }, time);
 };


 function calc(timestamp) {
    stage.calc();
    onTick(calc, 15);
 }

 onTick(calc, 15);


 function send(timestamp) {
    console.log(' update\t - '.blue, Date.now() - start);
    var data = [];
      for (var i = 0; i < stage.actors.length; i++) {
        var currentActor = stage.actors[i];
        var actorState = {
        'x' : Math.round(currentActor.x),
        'y' : Math.round(currentActor.y),
        'angle' : Math.round(currentActor.angle),
        'speed' : Math.round(currentActor.speed),
        'uid': currentActor.uid
        };
        data.push(actorState);
      }

    sio.sockets.emit('update', data);
    onTick(send, 45);
 }

 onTick(send, 45);





















