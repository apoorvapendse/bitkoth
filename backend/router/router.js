import { Router } from "express";
import { testApi } from "../controllers/test.js";

export const router = Router();

router.get("/",testApi)