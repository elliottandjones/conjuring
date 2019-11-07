const app = require('http').createServer();
const io = module.exports.io = require('socket.io')(app);
const SocketManager = require("./SocketManager");

const PORT = process.env.PORT || 3061;

io.on('connection', SocketManager);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
