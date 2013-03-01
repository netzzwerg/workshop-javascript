

  var serverPort    = process.env.PORT || 1337,
      express       = require('express'),
      UUID          = require('node-uuid'),
      verbose       = false,
      app           = express(),
      http          = require('http'),
      server        = http.createServer(app),
      sio           = require('socket.io').listen(server);

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