const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    thumbnails: { type: [] },
    name: { type: String },
    price: { type: Number },
    priceStart: { type: Number },
    priceEnd: { type: Number },
    type: { type: String },
    typedetail: { type: String },
    session: { type: String },
    description: { type: String },
    shopID: { type: String },

}, {
    timestamps: true,
});



module.exports = mongoose.model('Product', Product);