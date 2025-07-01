const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

//SIGNUP ENDPOINT LOGIC
exports.signup = async(req,res)=>{
    const {email, password} = req.body;
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({message: "user already exists"});
    const hashed = bcrypt.hash(password, 10);
    const user = await User.create({email, password : hashed});
    const token = jwt.sign({id: user.id, role:user.role}, process.env.JWT,{
        expiresIn: '1h'
    });
    res.json(token);
}

//SIGNIN ENDPOINT LOGIC
exports.login = async(req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message: "User Not Found"});
    const match = bcrypt.compare(password, user.password);
    if(!match) return res.status(401).json({message: "Incorrect password"})
        const token = jwt.sign({id: user.id, role:user.role}, process.env.JWT,{
        expiresIn: '1h'
    });
    res.json(token);
}