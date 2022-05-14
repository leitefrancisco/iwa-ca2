const { route } = require("express/lib/application");

module.exports.UPLOAD_PATH = 'uploads';

const   express = require("express"),
        router = express.Router(),
        recipeCtrl = require("./recipe-controller"),
        multer = require('multer'),
        upload = multer({ dest: module.exports.UPLOAD_PATH }),
        app = express(),
        path = require('path');



router.post('/recipes', recipeCtrl.createRecipe);
router.get('/recipes', recipeCtrl.getRecipes);
router.get('/recipes/:id', recipeCtrl.getRecipe);
router.put('/recipes/:id', recipeCtrl.updateRecipe);
router.delete('/recipes/:id', recipeCtrl.deleteRecipe);

//show the index.html at the index
router.get('/',(req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './views/')
    })
})


module.exports = router;