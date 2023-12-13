import { Users } from "../model/User.js";

export async function getPasswords(req,res){
    const{email} = req.body;
    console.log(req.body);
    const currUser = await Users.findOne({email:email});
    console.log(currUser);
    if(currUser){
        try {
            console.log({ passwords: currUser.savedPasswords });
            res.status(200).json({passwords: `${currUser.savedPasswords}`});

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