import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); 

class MongoConnection {
    constructor() {
        if(!MongoConnection.instance){
            this._connect(); 
            MongoConnection.instance = this; 

        }

        return MongoConnection.instance; 
    }

    async _connect() {
        try {
            // mongoose.connect(process.env.DOCKER_MONGO_URI, {
            //     user: process.env.USER_MONGO,
            //     pass: process.env.PASS_MONGO,
            //     authMechanism: "DEFAULT",
            //     authSource: "admin"
            // });  

            // mongoose.connect(process.env.LOCAL_MONGO_URI); 
            mongoose.connect(process.env.MONGO_URI); 

            console.log('MongoDB connected'); 
        } 
        
        catch (error) {
            console.error('MongoDB connection failed:', error.message); 
            process.exit(1); 
        }
    }
}

const mongoConnection = new MongoConnection(); 
Object.freeze(mongoConnection); 

export default mongoConnection; 
