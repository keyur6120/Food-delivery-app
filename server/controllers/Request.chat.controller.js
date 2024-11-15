import express from "express";
import { RequestModel } from "../models/Chat.js";

// complete
export const sendRequest = async (req, res) => {
    const { senderId, recevierId } = req.body;

    try {
        const CheckRequest = await RequestModel.findOne({ senderId, recevierId });
        if (CheckRequest) {
            return res.status(400).json({ message: "Request already sent" });
        }

        const newRequest = new RequestModel({
            sender: senderId,
            receiver: recevierId,
            status: "pending",
        });
        await newRequest.save();

        return res.status(200).json({ message: "Request sent successfully" });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

};

export const acceptRequest = async (req, res) => {
    const { requestId } = req.body;
    try {

        const FindRequest = await RequestModel.findById(requestId);
        if (!FindRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        if (FindRequest.status === "accepted") {
            return res.status(400).json({ message: "Request already accepted" });
        }

        FindRequest.status = "accepted";
        
        await FindRequest.save();

        return res.status(200).json({ message: "Request accepted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const rejectRequest = async (req, res) => {
    const { requestId } = req.body;
    try {
        const Reject = await RequestModel.findById(requestId)
        if (Reject.status === "rejected") {
            return res.status(400).json({ message: "Request already rejected" });
        }
        Reject.status = "rejected";
        await Reject.save();
        return res.status(200).json({ message: "Request rejected successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getRequest = async (req, res) => {
    const {userId} = req.params;
    try{
        const Requests = await RequestModel.find({recevierId: userId}).populate('sender','name email');
        if(!Requests){
            return res.status(404).json({message: "Request not found"});
        }
        return res.status(200).json({Requests});
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

export const FriendList  = async(req,res)=>{
    const {userId} = req.params;
    try{
        const findFriends = await RequestModel.find({
            $or: [{senderId: userId}, {recevierId: userId}],
            status: "accepted",
        })
        .populate("sender", "name email")
        .populate("receiver", "name email");
        const friendList = findFriends.map((req) =>
            req.sender._id.toString() === userId ? req.receiver : req.sender
          );
        return res.status(200).json({friendList});
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}