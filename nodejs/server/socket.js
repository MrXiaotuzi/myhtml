const express = require('express');
const proxy = require('http-proxy-middleware');
const enableDestroy = require('server-destroy');
const socketIo = require('socket.io');
const http = require('http');

const port = 3000;
const host = '127.0.0.1';

var app = express();
app.use(express.static('public'));

const server = http.createServer(app);
server.listen(port, host, (err) => {
	if (err) {
		console.error(err);
	}
	console.log(`Web Url: http://${host}:${port}`);

	enableDestroy(server);
});

var io = socketIo.listen(server);
io.sockets.on('connection',(socket)=>{

  socket.on('message',function(data){
    let newData = {title: '返回消息', text: data};
	console.log(data);
    socket.emit('receive_message',newData);
    socket.broadcast.emit('receive_message',newData);
  });
  
});

/**
var io = require('socket.io')(80);
var cfg = require('./config.json');
var tw = require('node-tweet-stream')(cfg);
tw.track('socket.io');
tw.track('javascript');
tw.on('tweet', function(tweet){
  io.emit('tweet', tweet);
});
**/