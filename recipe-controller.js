const Recipe = require("./models/recipe");

exports.createRecipe = function(req, res){
    let newRecipe = new Recipe(req.body);
    newRecipe.save(function(err, recipe){
        if(err){
            res.status(400).json(err);
        }
        res.json(recipe);
    });
};

exports.getRecipes = function(req, res){
    Recipe.find({}, function(err, recipes){
        if(err){
            res.status(400).json(err);
        }
        res.json(recipes);
    });
};

exports.getRecipe = function(req, res) {
    Recipe.findOne({_id: req.params.id}, function (err, recipe) {
      if (err) {
        res.status(400).json(err);
      } 
      res.json(recipe);
    }); 
};

exports.updateRecipe = function(req, res) {
    Recipe.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, recipe) {
      if (err) {
        res.status(400).json(err);
      } 
      res.json(recipe);
    }); 
};

exports.deleteRecipe = function(req, res) {
    Recipe.findByIdAndRemove(req.params.id, function (err, recipe) {
      if (err) {
        res.status(400).json(err);
      } 
      res.json(recipe);
    }); 
};