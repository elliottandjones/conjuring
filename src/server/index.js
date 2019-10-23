var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app);

const port = process.env.PORT || 3231;

const SocketManager = require('./socket-manager');

io.on('connection', SocketManager);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});