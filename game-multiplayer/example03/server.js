

  var serverPort    = process.env.PORT || 1337,
      express       = require('express'),
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


/* ------  ------  ------ Socket.IO ------  ------  ------ */

// your code here