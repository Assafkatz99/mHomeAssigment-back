import { Server, Namespace } from "socket.io";
import { getAllRooms } from "../services/room.service";

interface Room {
  id: string;
  code: string;
  connected: number;
  readOnly: boolean;
  firstClient: string | null;
}

let rooms: Room[] = [];

async function initRooms() {
  const allRooms = await getAllRooms();
  rooms = allRooms.map((r) => ({
    id: r["roomId"].toString(),
    code: r["roomCode"],
    connected: 0,
    readOnly: true,
    firstClient: null,
  }));
}

export function startSocketServer(server: any) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  initRooms();

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (roomId) => {
      const room = rooms[Number(roomId) - 1];
      socket.join(room.id);
      room.connected = room.connected + 1;
      console.log("code" + room["code"]);

      console.log(`User joined room ${room.id}, connected: ${room.connected}`);
      socket.emit("codeUpdate", room.code);
      socket.emit("readOnly", room.readOnly);
      socket.to(room.id).emit("userCount", room.connected);
      if (room.connected === 1) {
        room.readOnly = true;
        room.firstClient = socket.id;
      } else {
        room.readOnly = false;
      }

      if (room.connected > 1 && socket.id !== room.firstClient) {
        io.to(socket.id).emit("readOnly", false);
      }
    });

    socket.on("codeUpdate", (newCode) => {
      const room = rooms.find((r) => socket.rooms.has(r.id));
      if (room) {
        console.log(`Received code update in room ${room.id}: ${newCode}`);
        room.code = newCode;
        socket.to(room.id).emit("codeUpdate", newCode);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      const room = rooms.find((r) => r.id == socket.handshake.query.roomId);
      if (room) {
        if (room.connected > 0) {
          room.connected--;
          console.log(rooms[Number(room.id) - 1]);
        }
        console.log(`User left room ${room.id}, connected: ${room.connected}`);
        socket.to(room.id).emit("userCount", room.connected);

        if (room.connected === 0) {
          room.readOnly = true;
          io.to(room.id).emit("readOnly", room.readOnly);
        }
      }
    });
  });
}