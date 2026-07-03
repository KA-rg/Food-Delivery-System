import jwt from "jsonwebtoken"; //during every sign up/login.
import bcrypt from "bcrypt"; //securely hash passwords,not store plain-text passwords.
import validator from "validator"; //validating user input like email format, phone numbers, strong pw, etc.
import userModel from "../models/userModel.js";

// So the token is not reused — why?
// Because:

// Tokens contain a timestamp (issued-at iat) internally
// They are meant to represent a session, so every new session = new token
// It’s stateless — no storage or reuse on the server side unless you implement it.

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET); //secret key, used to sign the token so it can be verified later.
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "The password should be atleast  8 characters long."})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take (5-15 in general).
        //random string for hashing.
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser, registerUser}