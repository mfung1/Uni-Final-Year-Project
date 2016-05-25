/*
Student Number: 13051622
Student Name: Matthew Fung
Module Code: 6COM0284
Module Title: Web Based Systems Project
*/
//Setup dependencies and create variables for objects.
var pace = require('pace'),
    twitter = require('twitter'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
    events =require('events');
// Bad Code.
events.EventEmitter.defaultMaxListeners = Infinity;



//Setup twitter stream api
var twit = new twitter({
  consumer_key: 'Ykesum3T820wbPc5OKidvCS3c',
    consumer_secret: 'QroiGXx1JQ3w29x20GUyGB05vIIRZJ16uNyXG3PBhC8ydxvDdb',
    access_token_key: '401031289-Hfv699ehE1kv4uKuxrPJhSm7LhHdr1lVCx9M1wvv',
    access_token_secret: 'x3bvPqy7bWH32y6ITmlf5vhvHqtEWPLFJfxzVw7WVtbuY'
}),
    stream = null;

//Use the port 8081
server.listen(8081);

//Setup rotuing for app
app.use(express.static(__dirname + '/Core Files'));

//Create web sockets connection.
io.sockets.on('connection', function (socket) {

  socket.on("start tweets", function() {

    if(stream === null) {
      //Connect to twitter stream passing in filter for entire world.
      twit.stream('statuses/filter', {'locations':'-0.489,51.28,0.236,51.686'}, function(stream) {
          stream.on('data', function(data) {
              // Does the JSON result have coordinates

              if (data.coordinates){
                if (data.coordinates !== null){
                  //If so then build up some nice json and send out to web sockets
                  var outputPoint = {"lat": data.coordinates.coordinates[0],"lng": data.coordinates.coordinates[1]};

                  socket.broadcast.emit("twitter-stream", outputPoint);

                  //Send out to web sockets channel.
                  socket.emit('twitter-stream', outputPoint);
                }
                else if(data.place){
                  if(data.place.bounding_box === 'Polygon'){
                    // Calculate the center of the bounding box for the tweet
                    var coord, _i, _len;
                    var centerLat = 0;
                    var centerLng = 0;

                    for (_i = 0, _len = coords.length; _i < _len; _i++) {
                      coord = coords[_i];
                      centerLat += coord[0];
                      centerLng += coord[1];
                    }
                    centerLat = centerLat / coords.length;
                    centerLng = centerLng / coords.length;

                    // Build json object and broadcast it
                    var outputPoint = {"lat": centerLat,"lng": centerLng};
                    socket.broadcast.emit("twitter-stream", outputPoint);

                  }
                }
              }
              stream.on('limit', function(limitMessage) {
                return console.log(limitMessage);

              });

              stream.on('warning', function(warning) {
                return console.log(warning);
              });

              stream.on('disconnect', function(disconnectMessage) {
                return console.log(disconnectMessage);
              });
          });
      });
    }
  });

    // Emits signal to the client telling them that the
    // they are connected and can start receiving Tweets
    socket.emit("connected");
});
