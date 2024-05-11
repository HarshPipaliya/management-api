import express from "express";
import { login, signup, loginByToken } from "../controller";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/login-by-token", loginByToken);

export default router;
