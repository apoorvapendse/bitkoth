import { Users } from "../model/User.js";

export async function addPassword(req,res){
    const{email,passwordName,passwordValue} = req.body;
    const currUser = await Users.findOne({email:email});
    if(currUser){
        try {

            currUser.savedPasswords.push({
                name:passwordName,
                password:passwordValue
            })
            currUser.save();
            res.status(200).json({message:"Successfully added new password!"});
        } catch (error) {
            res.status(500).json({
                error:error
            })
        }
    }
    else{
        res.status(404).json({
            message:"User does not exist"
        })
    }
}