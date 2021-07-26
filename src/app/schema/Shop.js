const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Shop = new Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    zone: { type: String },
    type: { type: String },
    thumbnails: { type: String },
    description: { type: String },
    timeOpen: { type: String },
    timeClose: { type: String },

}, {
    timestamps: true,
});



module.exports = mongoose.model('Shop', Shop);