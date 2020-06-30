import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {salt} from '../config'
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase:true,
        trim:true,
        min: 6,
        max: 255
    },
    // hashedPassword: {
    //     type: String,
    //     required: true,
    //     min: 2,
    //     max: 1024
    // },
    // timestamps: {
    //     createdAt: {
    //         type: Date,
    //         default: Date.now
    //     },
    //     updatedAt: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }
});



export default mongoose.model('User', userSchema);
