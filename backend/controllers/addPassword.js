import { Users } from "../model/User.js";
import crypto from 'crypto'
async function encryptText(text) {
    var cipher = crypto.createCipheriv(process.env.ALGO, process.env.SECRET_KEY,process.env.IV);
    var encrypted =  cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return encrypted
}

export async function addPassword(req, res) {
    const { email, passwordName, passwordValue, masterPassword } = req.body;
    const currUser = await Users.findOne({ email: email });
    if (currUser) {
        try {

            currUser.savedPasswords.push({
                name: passwordName,
                password: await encryptText(passwordValue)
            })
            currUser.save();
            res.status(200).json({ message: "Successfully added new password!" });
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
    else {
        res.status(404).json({
            message: "User does not exist"
        })
    }
}