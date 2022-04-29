const Recipe = require("./models/recipe");

exports.createRecipe = function(req, res){
    let newRecipe = new User(req.body);
    newRecipe.save(function(err, user){
        if(err){
            res.status(400).json(err);
        }
        res.json(user);
    });
};

exports.getRecipes = function(req, res){
    Recipe.find({}, function(err, users){
        if(err){
            res.status(400).json(err);
        }
        res.json(users);
    });
};

exports.getRecipe = function(req, res) {
    Recipe.findOne({_id: req.params.id}, function (err, user) {
      if (err) {
        res.status(400).json(err);
      } 
      res.json(user);
    }); 
};

exports.updateRecipe = function(req, res) {
    Recipe.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, user) {
      if (err) {
        res.status(400).json(err);
      } 
      res.json(user);
    }); 
};

exports.deleteRecipe = function(req, res) {
    Recipe.findByIdAndRemove(req.params.id, function (err, user) {
      if (err) {
        res.status(400).json(err);
      } 
      res.json(user);
    }); 
};