import { createServer } from "http";
import { Server as IoServer } from "socket.io";
import cors from "cors";

const httpServer = createServer();
const io = new IoServer(httpServer, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow GET and POST methods
  },
});

io.on("connection", (socket) => {
  console.log("a user is connected");

   // This would be called whenever a new notification is created
   function notifyAdminOfNewNotification(notification: any) {
    io.emit('new-notification', notification);
  }

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(5000, () => {
  console.log("listening on *:5000");
});

(global as any).io = io;

export { httpServer, io };