const xxh = require('xxhashjs');

let io;

const configure = (ioServer) => {
  io = ioServer;

  io.on('connection', (sock) => {
    const socket = sock;
    socket.join('room1');

    socket.square = {
      hash: xxh.h32(`${socket.id}${Date.now()}`, 0xCAFEBABE).toString(16),
      lastUpdate: new Date().getTime(),
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      destX: 0,
      destY: 0,
      alpha: 0,
      height: 121,
      width: 61,
      direction: 0,
      frame: 0,
      frameCount: 0,
      moveLeft: false,
      moveRight: false,
      moveDown: false,
      moveUp: false,
    };

    socket.emit('joined', socket.square);

    socket.on('movementUpdate', (data) => {
      socket.square = data;
      socket.square.lastUpdate = Date.now();

      socket.broadcast.to('room1').emit('updatedMovement', socket.square);
      // io.sockets.in('room1').emit('updatedMovement', socket.square);
    });

    socket.on('disconnect', () => {
      io.sockets.in('room1').emit('left', socket.square.hash);

      socket.leave('room1');
    });
  });
};

module.exports.configure = configure;
