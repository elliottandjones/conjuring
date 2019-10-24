const app = require('http').createServer();
const io = module.exports.io = require('socket.io')(app);
const SocketManager = require("./socket-manager");

const port = process.env.PORT || 3121;

io.on('connection', SocketManager);

app.listen(port, () => console.log(`listening on port: ${port}`));