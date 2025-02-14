const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
   
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user._id, name, email } });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log("Login Request:", { email, password }); 
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not exist" });
  
      console.log("User Found:", user);
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid Password" });
  
      console.log("Password Matched!");
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  
    } catch (error) {
      console.error("Login Error:", error.message);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  
