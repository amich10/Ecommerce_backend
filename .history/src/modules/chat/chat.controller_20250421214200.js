import chatSvc from "./chat.service.js";

class ChatController {
    storeChat = async(req,res,next) =>{
        try {
            
            let loggedInuser = req.authUser;
            const data = req.body;
            data.sender = loggedInuser._id


            const chat = await chatSvc.create(data)

            res.json({s
                data:chat,
                message:"Message sent successfully",
                status:"CHAT_STORES",
                options:null
            })
        } catch (exception) {
            next(exception)
        }
    }
}
const chatCtrl = new ChatController()
export default chatCtrl;