import mongoose from 'mongoose'
import { connexionString } from '../config';

export const setUpConnection = async () => {
    try {
        return await mongoose.connect(connexionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (e) {
        throw e;
    }

};
