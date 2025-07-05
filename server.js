const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
  console.log('Client connected');

  socket.on('message', data => {
    const attendance = JSON.parse(data);
    console.log(`Received: ${attendance.student} at ${attendance.time}`);
    socket.send(`Attendance recorded for ${attendance.student}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
