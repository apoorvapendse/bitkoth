import { Users } from "../model/User.js";
import bcrypt from 'bcrypt';

export async function deletePassword(req, res) {
    const { email, masterPassword, arrayIndex } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMasterPasswordValid = await bcrypt.compare(masterPassword, user.masterPassword);

        if (!isMasterPasswordValid) {
            return res.status(500).json({ message: "Unable to delete password" });
        }

        
        user.savedPasswords.splice(arrayIndex, 1);

        await user.save();

        return res.status(200).json({ message: "Password deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
