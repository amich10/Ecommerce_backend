class ChatController {
    storeChat = async(req,res,next) =>{
        try {
            
            let loggedInuser = req.authUser;
            

        } catch (exception) {
            next(exception)
        }
    }
}
const chatCtrl = new ChatController()
export default chatCtrl;