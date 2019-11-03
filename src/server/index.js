const app = require('http').createServer();
const io = module.exports.io = require('socket.io')(app);
const SocketManager = require("./SocketManager");

const port = process.env.PORT || 3001;

io.on('connection', SocketManager);

app.listen(port, () => console.log(`listening on port: ${port}`));