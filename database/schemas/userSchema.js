import { Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter a username']
        },

        password: {
            type: String,
            required: [true, 'Please enter a password']
        },
        
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid email']
        },

        emailVerifiedAt: {
            type: Date,
            default: null
        }
    },

    {
        timestamps: true,
        versionKey: false
    }
)

export default userSchema;