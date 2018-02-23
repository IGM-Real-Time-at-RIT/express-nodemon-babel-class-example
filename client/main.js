"use strict";

let canvas;
let ctx;
let walkImage;
//our websocket connection
let socket; 
let hash;

const directions = {
  DOWNLEFT: 0,
  DOWN: 1,
  DOWNRIGHT: 2, 
  LEFT: 3,
  UPLEFT: 4,
  RIGHT: 5, 
  UPRIGHT: 6,
  UP: 7
};

let squares = {};

const keyDownHandler = (e) => {
    var keyPressed = e.which;
    const square = squares[hash];

    // W OR UP
    if(keyPressed === 87 || keyPressed === 38) {
      square.moveUp = true;
    }
    // A OR LEFT
    else if(keyPressed === 65 || keyPressed === 37) {
      square.moveLeft = true;
    }
    // S OR DOWN
    else if(keyPressed === 83 || keyPressed === 40) {
      square.moveDown = true;
    }
    // D OR RIGHT
    else if(keyPressed === 68 || keyPressed === 39) {
      square.moveRight = true;
    }

    //if one of these keys is down, let's cancel the browsers
    //default action so the page doesn't try to scroll on the user
    if(square.moveUp || square.moveDown || square.moveLeft || square.moveRight) {
      e.preventDefault();
    }
};

const keyUpHandler = (e) => {
    var keyPressed = e.which;
    const square = squares[hash];

    // W OR UP
    if(keyPressed === 87 || keyPressed === 38) {
      square.moveUp = false;
    }
    // A OR LEFT
    else if(keyPressed === 65 || keyPressed === 37) {
      square.moveLeft = false;
    }
    // S OR DOWN
    else if(keyPressed === 83 || keyPressed === 40) {
      square.moveDown = false;
    }
    // D OR RIGHT
    else if(keyPressed === 68 || keyPressed === 39) {
      square.moveRight = false;
    }       
};

const init = () => {
    walkImage = document.querySelector('#walk');
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    socket = io.connect();  

    socket.on('joined', setUser);
    socket.on('updatedMovement', update);
    socket.on('left', removeUser);

    document.body.addEventListener('keydown', keyDownHandler);
    document.body.addEventListener('keyup', keyUpHandler);
};

window.onload = init;