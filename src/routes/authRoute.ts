import express from "express";
import { register } from "../routeController/authController.js";
const router = express.Router();
router.post("/register", register);
export default router;