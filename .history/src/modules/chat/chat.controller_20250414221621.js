import chatSvc from "./chat.service";

class ChatController {
    storeChat = async(req,res,next) =>{
        try {
            
            let loggedInuser = req.authUser;
            const data = req.body;
            data.sender = loggedInuser


            const chat = await chatSvc.create(data)

            res.json({
                data:chat,
                message:""
            })
        } catch (exception) {
            next(exception)
        }
    }
}
const chatCtrl = new ChatController()
export default chatCtrl;