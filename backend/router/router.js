import { Router } from "express";
import { testApi } from "../controllers/test.js";
import { addNewUser, checkPreExistence } from "../controllers/adduser.js";
import { addPassword } from "../controllers/addPassword.js";
import { getPasswords } from "../controllers/getPasswords.js";
import { editPassword } from "../controllers/editPassword.js";
import { checkUser } from "../controllers/checkuser.js";
import { deletePassword } from "../controllers/deletePassword.js";

export const router = Router();


router.get("/",testApi)
router.post('/api/add-user', checkPreExistence, addNewUser);
router.post('/api/add-password',addPassword);
router.post('/api/get-all-passwords',getPasswords);
router.post('/api/edit-password',editPassword);
router.get('/api/check-presence',checkUser);
router.post('/api/delete-password',deletePassword)