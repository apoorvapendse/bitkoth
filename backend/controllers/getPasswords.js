import { Users } from "../model/User.js";
import crypto from 'crypto'
import bcrypt from 'bcrypt'

async function decryptPass(encryptedPass) {
    var decipher = crypto.createDecipheriv(process.env.ALGO, process.env.SECRET_KEY, process.env.IV);
    var decrypted = decipher.update(encryptedPass, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
}

export async function getPasswords(req, res) {
    const { email, masterPassword } = req.body;
    console.log(req.body);
    const currUser = await Users.findOne({ email: email });

    if (currUser) {
        try {
            console.log("bcrypt compare result:", await bcrypt.compare(masterPassword, currUser.masterPassword));
            if (await bcrypt.compare(masterPassword, currUser.masterPassword)) {
                // Use map and Promise.all to handle asynchronous operations
                const decryptedPasswords = await Promise.all(currUser.savedPasswords.map(async (item,index) => {
                    console.log(item);
                    const dpass = await decryptPass(item.password);
                    console.log(dpass);
                    currUser.savedPasswords[index].password = dpass; 
                    return dpass;
                }));

                console.log(decryptedPasswords);

                
                res.status(200).json({ passwords: currUser.savedPasswords });
            } else {
                res.status(403).json({
                    message: "Invalid password"
                });
            }

        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    } else {
        res.status(404).json({
            message: "User does not exist"
        });
    }
}
