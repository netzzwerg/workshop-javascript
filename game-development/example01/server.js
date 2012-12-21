var http = require('http'),
    fs = require('fs'),
    path = require('path');

var connections = {};
var serveFile = function serveFile(request, response) {

  var filePath = request.url;
  var contentType = 'text/html; charset=utf-8';
  var extname = null;

  if (filePath === '/'){ filePath = '/index.html'; }
  extname = path.extname(filePath);

  switch (extname) {
    case '.js':
      contentType = 'text/javascript; charset=utf-8';
    break;
    case '.css':
      contentType = 'text/css; charset=utf-8';
    break;
  }

  fs.readFile(__dirname + filePath, 'utf8', function(error, content) {
    response.writeHeader(200, { 'Content-Type': contentType });
    response.end(content, 'utf-8');
  });

};

var httpServer = http.createServer(serveFile).listen(1337);
var io = require('socket.io').listen(httpServer).set('log level',2);

io.sockets.on('connection', function (socket) {

  connections[socket.id] = true;
  console.log(connections);
  console.log(Object.keys(connections).length);

  socket.broadcast.emit('add');
  socket.on('show', function (data) {
    console.log('show');
    socket.broadcast.emit('show');
  });


  socket.on('disconnect', function () {
    console.log('disconnect');
    console.log(socket.id);

    delete connections[socket.id];
    console.log(Object.keys(connections).length);
    socket.broadcast.emit('remove');
  });

});