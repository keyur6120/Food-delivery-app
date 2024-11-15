import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        roomId: {
            type: String, // Unique identifier for the chat room (can be a direct chat or a group)
     
          },
        messages: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const groupSchema = new mongoose.Schema(
    {
        participants: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
        ],
        Messages:[ {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message",
          default: [],
        }],
      },
    { timestamps: true }
);

const MessageModel = mongoose.model('Message', messageSchema);
const RequestModel = mongoose.model('Request', RequestSchema);
const GroupModel = mongoose.model('Group', groupSchema);

export { MessageModel, RequestModel, GroupModel };