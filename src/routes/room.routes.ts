import express, { Request, Response } from "express";
import { getAllRoomsData, updateRoomCode } from "../controllers/room.controller";


const roomRouter = express.Router();

roomRouter.get('/',getAllRoomsData );

roomRouter.post('/updateRoom',updateRoomCode );




export default roomRouter;