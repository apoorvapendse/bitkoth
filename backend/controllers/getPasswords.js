import { encryptionKey } from "../index.js";
import { Users } from "../model/User.js";
import bcrypt from 'bcrypt'


export async function getPasswords(req, res) {
    const { email, masterPassword } = req.body;
    console.log(req.body);
    const currUser = await Users.findOne({ email: email });

    if (currUser) {
        try {
            console.log("bcrypt compare result:", await bcrypt.compare(masterPassword, currUser.masterPassword));
            if (await bcrypt.compare(masterPassword, currUser.masterPassword)) {
               
                for (let i = 0; i < currUser.savedPasswords.length; i++) {
                    const currPass = currUser.savedPasswords[i].password;
                    console.log("Before decryption:", currPass);
                
                    try {
                        currUser.savedPasswords[i].password = encryptionKey.decrypt(currPass, "utf8");
                        console.log("After decryption:", currUser.savedPasswords[i].password);
                    } catch (error) {
                        console.error("Decryption error:", error);
                        // Handle the error as needed
                    }
                }
                


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
