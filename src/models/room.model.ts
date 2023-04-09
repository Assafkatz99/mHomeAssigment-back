import { Schema, model } from "mongoose";
import mongoose from "mongoose";

export interface IRoom {
  roomName: string;
  roomId: number;
  roomCode: string;
}

export const roomSchema = new Schema<IRoom>({
  roomName: { type: String },
  roomId: { type: Number },
  roomCode: { type: String },
});

export const RoomModel = mongoose.model<IRoom>("rooms", roomSchema);
