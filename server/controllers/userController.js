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
      email,
      password,
      gender,
      department
    } = req.body;

    const image = req.file ? req.file.filename : null;

    // Check if the user already exists
    const userExists = await User.findOne({
      email
    });
    if (userExists) {
      return res.status(409).json({
        status:false,
        message: 'Email already registered'
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      department,
      image
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      status:true,
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
    email,
    password
  } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid user', status:false });
    }
    const userExist = await Login.findOne({ email });
    
    if(userExist){
    try {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid password', status:false });
      }
      const login = await Login.findOneAndUpdate(
        email, {
        password:hashedPassword,
      }, {
        new: true
      }
      );
     return res.status(201).json({ message: 'Login Succcess', status:"Success" });

    } catch(error){
      return res.status(401).json({ message: 'Login Failed', status:"Failed", error: error.message });
    }
  }
    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid password', status:false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    // Create and send a JWT token 
    const token = jwt.sign({ userId: user._id }, secretKey );
    const LoginUser = new Login({
      email,
      password: hashedPassword,
      token:token
    });
    await LoginUser.save();
    res.status(201).json({ message: 'Login successful', token, status:true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
}

exports.updateUserById = async (req, res) => {
  const {
    id,
    name,
    gender,
    department
  } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id, {
      name,
      gender,
      department
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

exports.resetUserByEmail = async (req, res) => {

  try {
    const {
      email,
      password
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const register = await User.findOneAndUpdate(
      email, {
      password:hashedPassword,
    }, {
      new: true
    }
    );
 
    if (!register) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      message: 'Password updated successfully',
      status:true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update password',
      status:false,
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
        message: 'User not found',
        status:false
      });
    }

    res.json({
      message: 'User deleted successfully',
      status:true
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete user',
      status:false,
      error: error.message
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all users', status:false, error: error.message });
  }
};

exports.loginStatus = async (req , res) =>{  
  try {
    const { token } = req.body  
    const user = await Login.findOne({ token });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status:false
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all users', status:false, error: error.message });
  }
}

exports.deleteUserByToken = async (req , res) =>{

  try {
    const { token } = req.body
  
    const user = await Login.findOne({token});

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status:false
      });
    }
    const deleteUser = await Login.findByIdAndDelete(user._id);
    res.json({
      message: 'User deleted successfully',
      status:true,
      data:deleteUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all users',status:false, error: error.message });
  }
}