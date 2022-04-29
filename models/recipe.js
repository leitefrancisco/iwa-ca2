const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema
    ({
        name: { type: String, unique: true, dropDups: true,lowercase: true},
        ingredients: [{
            type: String
        }],
        instructions: String,
        img:
            {
                data: Buffer,
                contentType: String
            } 
    })

module.exports = mongoose.model('Recipe', recipeSchema);

