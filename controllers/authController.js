const authModel = require("../models/authModel");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
class AuthController {
    static userRegistration = async (req, res) => {
        // res.send("user registration");
        // console.log(req.body);
        // console.log('Received request body:', req.body);
    const { username, email, password } = req.body;
    // console.log('Username:', username, 'Email:', email, 'Password:', password);
        // const {username, email, password} = req.body;
        // console.log(username, email, password);
        try{
            if(username && email && password){
                const isUser = await authModel.findOne({email});
                if(!isUser){
                    const genSalt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, genSalt);
                    const newUser = new authModel({username, email, password:hashPassword});
                    const savedUser = await newUser.save();
                        if(savedUser){
                            res.status(200).json({message:"user registered successfully", savedUser});}
                        }
                
                else{
                    return res.status(400).json({message:"user already exists, pls login"})
                }
                
            }
            else{
                return res.status(400).json({message:"all fields are required"})
            }
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    };

    static userLogin = async (req, res) => {
        console.log(req.body);
        // res.send("user login");
        const {email, password} = req.body;
        try{
            if(email && password){
                const isUser = await authModel.findOne({email});
                if(isUser){
                    const isMatch = await bcrypt.compare(password, isUser.password);
                    if(isUser.email === email && isMatch){

                        //token generation
                        const token = jwt.sign({userId: isUser._id}, process.env.JWT_SECRET, {expiresIn:"2d"});   //{expiresIn:"1d"}
                        
                        res.status(200).header("auth-token", token).json({message:"user login successfully", token, name: isUser.username})
                    }
                    else{
                        return res.status(400).json({message:"password is incorrect"})
                    }}
                else{
                    return res.status(400).json({message:"user does not exist"})
                }}
            else{
                return res.status(400).json({message:"all fields are required"})
            }       
}
catch(err){
    return res.status(500).json({message:err.message})
}
    }}
module.exports = AuthController;