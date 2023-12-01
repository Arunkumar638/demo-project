const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

// Set up multer upload
const upload = multer({ storage: storage });


router.post('/register', upload.single('image'), userController.registerUser);
router.post('/login',userController.loginUser);
router.post('/login-status',userController.loginStatus);

router.get('/getalluser', userController.getAllUser);
router.put('/update', userController.updateUserById);
router.put('/reset',userController.resetUserByEmail)

router.delete('/delete', userController.deleteUserById);
router.delete('/logout',userController.deleteUserByToken);

module.exports = router;
