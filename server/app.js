const http = require('http');
const path = require('path');
// express is a popular Model-View-Controller framework for Node
/**
  Express is a powerful, robust and secure framework for MVC in Node.
  It is not perfect as no server is, so developers may still introduce
  security flaws in code or through configuration issues.
  
  Express handles many basic server functions for you. 
  
  This includes routing various URLs, handling HTTP methods (get, post, etc),
  serving files automatically (css, video, audio, html, JS, etc) and MUCH more. 
  
  We'll use it for handling many of our pages and files for us in few lines of code.
**/
const express = require('express');
// socket.io is a popular websocket framework for Node
const socketio = require('socket.io');

//pull in our socket file to handle our websockets
const sockets = require('./sockets.js');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

//Create a new express app. This will create an instance of the express MVC server
const app = express();

//Tell express that any url starting with /assets will serve files out of the hosted folder.
//This means /assets in the browser is /hosted on the computer. Anything after that follows
//relative paths like with traditional static file servers you have used. 
/**
  app.use in express means that every time a request comes in, this code will be called to
  check if it matches a URL (in this case anything starting with /assets) and then calls
  a function (in this case the express static server function to host all the files in a folder).
  
  This particular code will automatically host all of the files in the /hosted folder online. 
**/
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));

//If the user goes to the home page, send back our HTML file. 
/**
  app.get in express means that any time there is a GET request to this url, then call a 
  certain function. In this case the URL is / (or the homepage) and it calls res.sendFile
  which will send back a file.
  
  Express handles the status codes, headers, etc automatically with the option for you
  to change them before sending.
**/
app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../hosted/index.html`));
});

//Create a new HTTP server and pass in our express instance as the server callback
//Previously this was an onRequest method, but now we are passing in our express app instead
const server = http.createServer(app);

//Create a new socket.io server and pass in our HTTP server for it to host.
const io = socketio(server);

//pass our new socket.io server to our sockets file to handle the websocket code
sockets.configure(io);

//have our server start listening for traffic
server.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${PORT}`);
});
