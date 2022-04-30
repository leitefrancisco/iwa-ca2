module.exports.UPLOAD_PATH = 'uploads';

const   express = require("express"),
        router = express.Router(),
        recipeCtrl = require("./recipe-controller"),
        multer = require('multer'),
        upload = multer({ dest: module.exports.UPLOAD_PATH });

router.post('/recipes', recipeCtrl.createRecipe);
router.get('/recipes', recipeCtrl.getRecipes);
router.get('/recipes/:id', recipeCtrl.getRecipe);
router.put('/recipes/:id', recipeCtrl.updateRecipe);
router.delete('/recipes/:id', recipeCtrl.deleteRecipe);


module.exports = router;