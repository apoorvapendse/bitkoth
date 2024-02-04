import { Users } from "../model/User.js";
import { encryptionKey } from "../index.js";

export async function editPassword(req, res) {
    let { email, passwordName, passwordValue, arrayIndex } = req.body;
    const currUser = await Users.findOne({ email: email });
    
    console.log(req.body);
    arrayIndex = +arrayIndex
    if (currUser) {
        try {
            if (arrayIndex >= 0 && arrayIndex < currUser.savedPasswords.length) {
                // Update the password at the specified index
                currUser.savedPasswords[arrayIndex] = {
                    name: passwordName,
                    password: encryptionKey.encrypt(passwordValue,"base64")
                };

                await currUser.save();
                console.log("password saved successfully")
                res.status(200).json({ message: "Successfully modified password!" });
            } else {
                res.status(400).json({ message: "Invalid array index provided" });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(404).json({ message: "User does not exist" });
    }
}
