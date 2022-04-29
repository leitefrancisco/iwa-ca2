const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema
    ({
        name: { type: String, unique: true, dropDups: true,lowercase: true},
        tags: [{
            type: String
        }],
        instructions: String  
    })

module.exports = mongoose.model('Recipe', recipeSchema);

