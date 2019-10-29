const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const SocketManager = require("./socket-manager");

const port = process.env.PORT || 3001;

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", SocketManager);
// io.on("connection", function(socket) {
//   console.log("a user connected");
  
//   socket.on("message", function(msg) {
//     console.log("MESSAGE: ", msg);
//   });
// });

server.listen(port, function() {
	console.log(`Listening on port *:${port}`);
});
