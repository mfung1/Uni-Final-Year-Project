/*
Student Number: 13051622
Student Name: Matthew Fung
Module Code: 6COM0284
Module Title: Web Based Systems Project
*/
function initialize() {
  //Setup Google Map
    var myLatlng = new google.maps.LatLng(51.507351,-0.127758),
        light_grey_style = [{"featureType": "landscape", "stylers": [{"saturation": -100},
         {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100},
         {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100},
         {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30},
         {"visibility": "on"}]},  {"featureType" : "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]},
         {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]},
         {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"},
          {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25},
           {"saturation": -97}]}],
        myOptions = {
            zoom: 10,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_BOTTOM
                scrollwheel: false
            },
            styles: light_grey_style
        };
  var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

  //Setup heat map and link to Twitter array to append data to
  var heatmap;
  var tweetarray = [];
  var liveTweets = new google.maps.MVCArray();
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: liveTweets,
    radius: 10
  });
  heatmap.setMap(map);



  if(io !== undefined) {
    // Storage for WebSocket connections
    var socket = io.connect('/');

    // This listens on the "twitter-steam" channel and data is
    // received everytime a new tweet is receieved.
    socket.on('twitter-stream', function (data) {

      //Add tweet to the heat map array.
      var tweetLocation = new google.maps.LatLng(data.lng,data.lat);
      // Testing below to check tweets are actually being received
      /*for(var i = 0; i<tweetarray.length; i++){
        console.log(data);
      }*/
      liveTweets.push(tweetLocation);
      tweetarray.push(tweetLocation);

      // count how many tweets in array "liveTweets" then post it to the counter
      var counterhtml = document.getElementsByClassName('counter')[0];
      counterhtml.textContent = (tweetarray.length);
      //Flash a dot onto the map quickly
      var image = "css/small-dot-icon.png";
      var marker = new google.maps.Marker({
        position: tweetLocation,
        map: map,
        icon: image
      });
      setTimeout(function(){
        marker.setMap(null);
      },500);

    });

    // Listens for a success response from the server to
    // say the connection was successful.
    socket.on("connected", function(r) {

      //Now that we are connected to the server let's tell
      //the server we are ready to start receiving tweets.
        socket.emit("start tweets");
    });
  }
}
