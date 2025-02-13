const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json()); 

const allowedOrigins = ['http://localhost:5173', 'https://your-vercel-app.vercel.app'];


app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.post('/api/users/signin', async (req, res) => {
    console.log('Sign-In request received');
    const { email, password } = req.body;
    console.log('Email:', email, 'Password:', password); 
  
    try {
  
      const user = await User.findOne({ email });
      console.log(user); 
  
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password validation:', isPasswordValid); 
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials!' });
      }
  
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      return res.status(200).json({
        message: 'Sign-in successful!',
        token,
        user: { id: user._id, email: user.email, name: user.name },
      });
    } catch (error) {
      console.error('Error in Sign-In:', error); 
      return res.status(500).json({ message: 'Something went wrong!', details: error.message });
    }
  });
  

app.get("/", (req, res) => {
   res.send("Backend is working")
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
