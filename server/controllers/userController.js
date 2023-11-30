const User = require('../models/userModel');
const Login = require('../models/loginModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var randomstring = require("random-string-gen");
const secretKey = randomstring();

exports.registerUser = async (req, res) => {

  try {
    const {
      name,
      mail,
      password,
      confirmPassword,
      gender,
      qualification
    } = req.body;
    console.log(req);
    const image = req.file;
    // Check if the user already exists
    const userExists = await User.findOne({
      mail
    });
    if (userExists) {
      return res.status(409).json({
        message: 'Email already registered'
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedconfirmPassword = await bcrypt.hash(confirmPassword, salt);
    // Create a new user
    const newImage = {
      data: image,
      contentType: req.file.mimetype,
    };
    const newUser = new User({
      name,
      mail,
      password: hashedPassword,
      confirmPassword: hashedconfirmPassword,
      gender,
      qualification,
      image:newImage
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to register user',
      error: error.message
    });
  }
};

exports.loginUser = async(req , res) =>{
  const {
    mail,
    password
  } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid passowrd' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    // Create and send a JWT token as a cookie
    const token = jwt.sign({ userId: user._id }, secretKey );
    const LoginUser = new Login({
      mail,
      password: hashedPassword,
      token:token
    });
    await LoginUser.save();
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
}

exports.updateUserById = async (req, res) => {
  const {
    id,
    name,
    gender,
    qualification
  } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id, {
      name,
      gender,
      qualification
    }, {
      new: true
    }
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update user',
      error: error.message
    });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete user',
      error: error.message
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all users', error: error.message });
  }
};

exports.loginStatus = async (req , res) =>{  
  try {
    const { token } = req.body  
    const user = await Login.findOne({ token });
    // console.log(user);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all users', error: error.message });
  }
}

exports.deleteUserByToken = async (req , res) =>{

  try {
    const { token } = req.body
  
    const user = await Login.findOne({token});

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    const deleteUser = await Login.findByIdAndDelete(user._id);
    res.json({
      message: 'User deleted successfully',
      data:deleteUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all users', error: error.message });
  }
}