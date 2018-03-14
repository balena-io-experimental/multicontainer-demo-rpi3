const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {
  exec
} = require('child_process');

period = parseInt(process.env.PERIOD) || 500;

server.listen(8080);

let getCpuTemp = function(socket) {
  'use strict';
  exec('cat /sys/class/thermal/thermal_zone*/temp', (err, stdout) => {
    if (err) throw err;
    let data = {
      t: parseFloat(stdout) / 1000
    };
    socket.emit('temperature', data);
  });
};

let getRandomTemp = function(socket) {
  'use strict'
  let data = {
    t: (20 + Math.floor(Math.random() * 30))
  };
  socket.emit('temperature', data);
};

io.on('connection', function(socket) {
  'use strict';
  console.log('a user connected');
  let dataLoop = setInterval(function() {
    //getCpuTemp(socket);
    getRandomTemp(socket);
  }, period);
	socket.on('disconnect', function() {
      console.log('a user disconnected');
			clearInterval(dataLoop);
   });
});
