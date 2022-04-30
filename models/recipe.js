const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [{
        type: String
    }],
    instructions: String,
    
    },{ writeConcern: { w: 'majority', j: true, wtimeout: 1000 } })

module.exports = mongoose.model('Recipe', recipeSchema);

