import mongoose from "mongoose";
import { DBconfig } from "./constants.js";

const dbInit = async () =>{
    try{
        await mongoose.connect(DBconfig.mongodbUrl, {
            dbName: DBconfig.dbName,
            autoCreate: true,
            autoIndex: true
        });
        console.log("Connected to Database:", mongoose.connection.db.databaseName);

    }
    catch(exception){
        console.log("Error established on connection");
        throw exception;
    }
}
dbInit()