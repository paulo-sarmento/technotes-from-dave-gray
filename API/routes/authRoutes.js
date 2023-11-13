import Express from "express";
import loginLimiter from "../middleware/loginLimiter.js";
import { login, refresh, logout } from "../controllers/authController.js";

const authRoutes = Express.Router();

authRoutes.route("/").post(loginLimiter, login);

authRoutes.route("/refresh").get(refresh);

authRoutes.route("/logout").post(logout);

export default authRoutes;
