module.exports.UPLOAD_PATH = 'uploads';

const   express = require("express"),
        router = express.Router(),
        imageCtrl = require('./image-controller'),
        userCtrl = require("./user-controller"),
        multer = require('multer'),
        upload = multer({ dest: module.exports.UPLOAD_PATH });

router.post('/recipes', recipeCtrl.createUser);
router.get('/recipes', recipeCtrl.getUsers);
router.get('/recipes/:id', recipeCtrl.getUser);
router.put('/recipes/:id', recipeCtrl.updateUser);
router.delete('/recipes/:id', recipeCtrl.deleteUser);

router.post('/images', upload.single('image'), imageCtrl.uploadImage);
router.get('/images', imageCtrl.getImages);
router.get('/images/:id', imageCtrl.getImage);
router.delete('/images/:id', imageCtrl.deleteImage);

module.exports = router;