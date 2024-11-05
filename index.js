const { Server } = require('socket.io');
const express = require('express');
const { createServer } = require('http'); 
const { join } = require('path'); 

const PORT = 8080; 
const app = express();
const server = createServer(app); 
const io = new Server(server);
app.use(express.static(join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Listen for chat messages
  socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      // Emit the message to all clients
      io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
