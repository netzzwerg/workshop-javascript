

  var serverPort    = process.env.PORT || 1337,
      express       = require('express'),
      colors        = require('colors'),
      verbose       = false,
      app           = express(),
      http          = require('http'),
      server        = http.createServer(app),
      sio           = require('socket.io').listen(server),
      clients       = {};

  /* ------  ------  ------ Physics ------  ------  ------ */

// your code here

  /* ------  ------  ------ Express ------  ------  ------ */

  server.listen(serverPort);
  console.log(' server\t - express listening on port ' + serverPort );

  app.get( '/', function( req, res ){
    res.sendfile( __dirname + '/index.html' );
  });

  app.get( '/*' , function( req, res, next ) {
    var file = req.params[0];
    if(verbose) console.log('\t :: Express :: file requested : ' + file);
    res.sendfile( __dirname + '/' + file );
  });

  /* ------  ------  ------ Socket.IO ------  ------  ------ */

  sio.configure(function (){
    sio.set('log level', 0);
    sio.set('authorization', function (handshakeData, callback) {
      callback(null, true); // error first callback style
    });
  });

  sio.sockets.on('connection', function (socket) {
    newClient(socket);
    socket.on('clientMessage', onClientMessage);
    socket.on('disconnect', onDisconnect);
  });

  function onClientMessage(data) {
    clients[data.uid].data = data;
    stage.getActor(data.uid).setTarget(data.x, data.y, data.angle);
    sio.sockets.emit('clientMessage', data);
    console.log(' client\t - '.blue, data);
  }

  function onDisconnect() {
    var uid = this.id;
    sio.sockets.emit('clientDisconnect', {uid:uid});
    delete clients[uid];
    stage.removeActor(uid);
    console.log(' client\t - '.red + uid + ' disconnected');
  }

  function newClient(socket) {
    var clientUID = socket.id;

    // tell current connection that it is connected
    socket.emit('connected', {
      'uid' : clientUID,
      'clients' : clients
    });

    clients[clientUID] = {'data' : {
      'x' : 0,
      'y' : 0,
      'angle' : 0,
      'uid': clientUID
    }};

    // create and add new actor
    var actor = new Actor();
    actor.init('#A6E22E', clientUID);
    stage.addActor(actor);

    // tell other sockets that there is a new client
    socket.broadcast.emit('clientConnect', {
      'uid' : clientUID
    });

    console.log(' client\t - '.green + clientUID + ' connected');
  }