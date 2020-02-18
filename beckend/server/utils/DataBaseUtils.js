const mongoose = require ('mongoose');
import { connexionString } from '../config';

module.exports.setUpConnection = function () {
    return mongoose.connect(connexionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
};
