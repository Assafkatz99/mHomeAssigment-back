import { RoomModel } from "../models/room.model";

export const getAllRooms = async () => {
    try {
      const rooms = await RoomModel.find();
      return rooms;
    } catch (err) {
      console.log(err);
      throw err;

    }
  };


export const updatingRoomData = async (
    roomId: number,
    roomCode:string) => {
  try {
    const _updatingRoomData = await RoomModel.findOneAndUpdate(
      { roomId: roomId },
      { $set: { roomCode: roomCode } }
    );
    if (_updatingRoomData) {
      return _updatingRoomData;
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
};