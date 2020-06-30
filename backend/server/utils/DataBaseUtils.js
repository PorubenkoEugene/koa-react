import mongoose from 'mongoose'
import { connectionString } from '../config';

export const setUpConnection = async () => {
    try {
        return await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (e) {
        throw e;
    }

};
