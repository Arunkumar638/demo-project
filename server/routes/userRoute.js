const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');
// const storage = multer.diskStorage();
// const upload = multer({ storage: storage });


router.post('/register', /*upload.single('uploadImage')*/ userController.registerUser);
router.post('/login',userController.loginUser);
router.post('/login-status',userController.loginStatus);


router.get('/getalluser', userController.getAllUser);
router.put('/update', userController.updateUserById);

router.delete('/delete', userController.deleteUserById);
router.delete('/logout',userController.deleteUserByToken);


module.exports = router;
