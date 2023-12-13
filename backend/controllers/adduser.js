import { Users } from "../model/User.js";
import bcrypt from 'bcrypt'
export async function checkPreExistence(req,res,next){
    const {email} = req.body;
    const value = await Users.findOne({email:email});
    if(value){
        res.status(404).json({
            message:"User Already Exists!!!"
        })
    }
    else{
        next()
    }
}

export async function addNewUser(req,res){
    const newUser = await Users.create({
        email:req.body.email,
        masterPassword:await bcrypt.hash(req.body.masterPassword,10),
        savedPasswords:[],
        
    })
    console.log("Added new user with the details:",newUser);
    res.json({
        message:"new user added successfully",
        details:newUser
    })
}