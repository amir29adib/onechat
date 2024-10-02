import { httpServer } from "./app";
import { CHAT_FILE, chatHistory } from "./data-source";
import fs from "fs";
import { Server } from "socket.io";

declare module "socket.io" {
  interface Socket {
    username: string;
  }
}

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("set username", (username: string) => {
    socket.username = username;
    console.log(`${username} connected`);

    socket.emit("chat history", chatHistory);
  });

  socket.on("chat message", (msg) => {
    const messageData = {
      id: socket.id,
      username: socket.username || "Anonymous",
      message: msg,
      timestamp: new Date(),
    };

    chatHistory.push(messageData);

    fs.writeFileSync(CHAT_FILE, JSON.stringify(chatHistory, null, 2));

    io.emit("chat message", messageData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.username || "Anonymous");
  });
});
