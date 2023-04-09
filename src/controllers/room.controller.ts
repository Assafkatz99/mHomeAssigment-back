import { Request, Response } from "express";
import { updatingRoomData, getAllRooms } from "../services/room.service";

export const getAllRoomsData = async (req: Request, res: Response) => {
  try {
    const rooms = await getAllRooms();

    return res.status(200).json({
      message: "All rooms data retrieved successfully",
      rooms: rooms,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateRoomCode = async (req: Request, res: Response) => {
  try {
    const roomId = req.body.roomId;
    const roomCode = req.body.roomCode;

    const updatedRoom = await updatingRoomData(roomId, roomCode);

    if (updatedRoom) {
      return res.status(200).json({
        message: "Room code updated successfully",
        room: updatedRoom,
      });
    } else {
      return res.status(404).json({
        message: "Room not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
