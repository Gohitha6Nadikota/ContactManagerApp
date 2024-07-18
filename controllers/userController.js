const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../models/userModel');
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const isUser=await User.findOne({email});
    if(isUser)
    {
        res.status(400);
        throw new Error("User already existed!")
    }
    console.log(password)
    const hashedpassword=await bcrypt.hash(password,10);
    console.log("hash"+hashedpassword);
    const user=await User.create({
        username,
        email,
        password:hashedpassword
    })
    if(user)
    res.status(200).json(user);
    else{
    res.status(400);
    throw new Error("User data is not created");
    }
})
const loginUser = asyncHandler(async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const accessToken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user._id,
            },
          },
          process.env.SECRET,
          { expiresIn: "1d" }
        );
        res.status(200).json({ accessToken });
      } else {
        res.status(401);
        throw new Error("Email or password is not correct" );
      }
    } else {
      res.status(401);
      throw new Error("Email or password is not correct");
    }
})
const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user);
})
module.exports={registerUser,loginUser,currentUser};