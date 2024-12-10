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
            mongoose.connect(process.env.MONGO_URL);  
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
