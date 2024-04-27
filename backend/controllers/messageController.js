import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getRecipientSocketId, io } from "../socket/socket.js";


async function sendMessage(req,res){
    try {
        const { recipientId, message } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] },
        });
        
        if(!conversation){
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage:{
                    text:message,
                    sender:senderId,
                }
            })
            await conversation.save();
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
        });

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage:{
                    text: message,
                    sender: senderId,
                }
            })
        ])

        const recipientSocketId = getRecipientSocketId(recipientId);
        if(recipientSocketId){
            io.to(recipientSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage)

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


async function getMessages(req,res) {
    const {otherUserId} = req.params;    
    const userId = req.user._id;  //id of current user which is inside request object
    try {
        const conversation = await Conversation.findOne({
            participants:{ $all: [userId, otherUserId] }
        })
        if(!conversation){
            return res.status(404).json({ error: "Conversation not found" })
        }
        const messages = await Message.find({
            conversationId: conversation._id
        }).sort({createdAt: 1}) //so that we get  newest one at the top
        
        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getConversations(req,res){
    const userId = req.user._id
    try {
        const conversations = await Conversation.find({ participants: userId }).populate({   //popolate is a method in mongoose through which we can do the process we are doing below
            path: "participants",                                                           // here we will go to UserModel throug participants
            select: "username profilePic",                                                 // and then we will select username and prfilePic
        });

        //remove the current user from the participants array
        conversations.forEach((conversation) => {
			conversation.participants = conversation.participants.filter(
				(participant) => participant._id.toString() !== userId.toString()
			);
		});
		res.status(200).json(conversations);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}



export { sendMessage, getMessages, getConversations };