import express from "express";
import { register, login, logout, refreshTokenController } from "../routeController/authController.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login)
router.post("/logout", logout);
router.post("/refresh", refreshTokenController);
export default router;