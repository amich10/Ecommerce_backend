
import mongooese from "mongoose";


const chatSchema = new mongooese.Schema({
    sender:{
        type:mongooese.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongooese.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        
    }
})