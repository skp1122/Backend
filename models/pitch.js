const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pitchSchema = mongoose.Schema({
    entrepreneur: {
        type: String,
        required: true
    },
    pitchTitle: {
        type: String,
        required: true
    },
    pitchIdea: {
        type: String,
        required: true
    },
    askAmount: {
        type: Number,
        required: true
    },
    equity: {
        type: Number,
        required: true,
        min:0,
        max:100
    },
},{ timestamps: true });

const Pitch = mongoose.model('Pitch', pitchSchema);


module.exports = Pitch;