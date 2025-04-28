class ChatController {
    storeChat = async(req,res,next) =>{
        try {
            
        } catch (exception) {
            next(exception)
        }
    }
}
const chatCtrl = new ChatController()
export default chatCtrl;