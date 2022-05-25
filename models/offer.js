const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = mongoose.Schema({
    investor: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    equity: {
        type: Number,
        required: true,
        min:0,
        max:100
    },
    comment:{
        type: String,
        required: true
    },
    id:{
        type: String,
        required:true
    }
},{ timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);


module.exports = Offer;