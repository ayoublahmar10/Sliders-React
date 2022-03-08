const express = require("express");
const app = express();
const path = require("path");
const DIST_DIR = path.join(__dirname, "../dist");
const http = require('http');
const server = http.createServer(app);
const HTML_FILE = path.join(DIST_DIR, "index.html");
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static(DIST_DIR));


const port = process.env.PORT || 3000;
const mockResponse = {
  foo: "bar",
  bar: "foo",
};
app.get("/api", (req, res) => {
  res.send(mockResponse);
});
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on("action", (msg) => {
    console.log("action received from client", msg);
    socket.broadcast.emit("action", msg);
  });
});


server.listen(port, function () {
  console.log("App listening on port: " + port);
});




