import { Users } from "../model/User.js";

export async function checkUser(req,res){
    const email = req.query.mail;
    console.log("checking presence of user with mail:",req.params);
    const value = await Users.findOne({email:email});
    if(value){
        res.status(200).json({
            message:"User Found!!!"
        })
    }
    else{
        res.status(404).json({
            message:"User not found in DB"
        })
    }
}