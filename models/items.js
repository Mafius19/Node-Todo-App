const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
}, {timestamps: true});

const item = mongoose.model('Item', itemSchema);
module.exports = item;