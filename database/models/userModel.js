import mongoose from "mongoose";
import userSchema from "../schemas/userSchema.js";

const userModel = mongoose.model('userModel', userSchema); 

export default userModel; 