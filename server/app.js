const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const sockets = require('./sockets.js');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;