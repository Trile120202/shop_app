const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: [String],
        required: true,
    },
    oldPrice: {
        type: String,
        required: false,
    },
  
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Product", ProductSchema)
