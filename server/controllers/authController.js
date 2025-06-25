const bcrypt = require("bycrypt")
const jwt = require("jsonwebtoken")
const user = require("../models/User")

exports.signup = async(req,res)=>{
    const {email, password} = req.body;
}