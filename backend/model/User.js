import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
    name:String,
    password:String
})

const UserSchema = new mongoose.Schema({
   
    masterPassword:String,
    email:String,
    savedPasswords:[PasswordSchema]
})


const Users = mongoose.model("Users",UserSchema);
export {Users};