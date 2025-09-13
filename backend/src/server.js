require('dotenv').config();
const app = require('./app');
const http = require('http');
const { Server } = require("socket.io");

const server = http.createServer(app);

// Set up Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

// Make the io instance available to other parts of your app
app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('A user connected to the dashboard');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
