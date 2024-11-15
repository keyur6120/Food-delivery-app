import {MessageModel,GroupModel} from '../models/Chat.js';


export const sendMessage = async(req,res)=>{
    const {senderId,receiverId,roomId,message} = req.body;
    try{
        let conversation  = await GroupModel.findOne({
            participants :{$all:[senderId,receiverId]}
        })

        if(!conversation){
            conversation =  await GroupModel.create({
                participants:[senderId,receiverId],
                isGroupChat:false
            })
        }

        const newMessage = await MessageModel.create({
            senderId,
            receiverId,
            roomId,
            message
        })

        if(newMessage){
            conversation.Messages.push(newMessage._id)
        }
       
        await Promise.all([conversation.save(),newMessage.save()])

    
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


export const GetMessages = async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({message:error.message})
    }
}