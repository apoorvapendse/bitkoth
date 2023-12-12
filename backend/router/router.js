import { Router } from "express";
import { testApi } from "../controllers/test.js";
import { addNewUser, checkPreExistence } from "../controllers/adduser.js";

export const router = Router();


router.get("/",testApi)
router.post('/api/addUser', checkPreExistence, addNewUser);