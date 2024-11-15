import express from "express";
import {FriendList,acceptRequest,getRequest,rejectRequest,sendRequest} from '../controllers/Request.chat.controller.js';
import {sendMessage} from '../controllers/message.chat.js'

const router = express.Router();

//send request
router.post("/send-request", sendRequest);
router.post("/accept-request", acceptRequest);
router.post("/reject-request", rejectRequest);
router.get("/get-requests/:id", getRequest);
router.get("/get-friends/:id", FriendList);

//send message 

router.post("/send-message", sendMessage);



export default router;