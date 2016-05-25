# Uni-Final-Year-Project
Web application which displays locations of user tweets using Node.js as a server and Bootstrap for a fluid layout.

Creating web applications is where usability, design and functionality meet. This project
attempts to touch on each of these properties, and extend my knowledge in web
application development. More specifically, my ability in client side scripting and
understanding of the Node framework.

The server side of this web application is powered by two files, package.json and server.js.
The file package.json contains metadata regarding the project, and lists the dependencies the
application requires. This ‘Server’ file executes lines of JavaScript to set up Express and Sockets, so
that data can be retrieved from Twitter, and contains the logic for parsing the data received from
Twitter. The application connects to the Web Socket server and triggers the connection listener.
Using another event listener, ‘start tweets’ is created and a message saying that the application is
connected is sent to the client.

When this message is received by the client, it then tells the event listener ‘start tweets’ that the
application is connected to the server, allowing the tweets to be streamed. Before we begin
streaming tweets however, it is important to check if there is a stream session already active
otherwise we won’t be able to receive any tweets.

Twitter limits the number of connections a single device can make to the streaming end points. To ensure
that only one connection is made per session, an IF statement is used to check whether the object
stream is null. If a successful connection is made, the object is then not null and contains the value of
true. When the session has ended, the value of stream is null.

Since this application requires the location in which tweets are sent, a simple if statement is made to
check if the tweet received contains the property ‘co-ordinates’ ( See Appendix 6 for further
explanation). If the tweet does have a co-ordinates property, then we check if the property actually
has a value. Should the property have a value, some simple JSON is made containing that information
to strip Twitter’s JSON and just have the latitude and longitude values in our JSON.

On the client side, the ‘app.js’ file acts as the controller applying the data received in the model and
then applies it into the view (HTML). Since I am using the JavaScript version of the Maps API from
Google, some syntax is given to set up the view. To display the tweets the application has received
from the server side, when something is emitted on the ‘twitter-stream’ event listener the value of
the object is added to the array liveTweets. The latitude and longitude the JSON has is also stored
in an object called tweetLocation.

To show that tweets are being received on the map, I have used the Marker method from the
Google Maps object. It takes the position of the tweet and then displays an image where it was. A
timeout function is set so that after 2 seconds, the marker is removed from the map. This helps give
the impression that the data is being received in real time.
I created a file called ‘timer.js’. The idea behind it was to demonstrate the reasoning for my colour
scheme decisions by conducting a reading speed test with different text & background colours. It is
essentially a stopwatch, starting a timer when a button is pressed and stops when another button is
pressed. Since I did not get ethics approval, I could not carry out this experiment. 
