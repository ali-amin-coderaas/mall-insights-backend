import express from "express";
import { login } from "../controllers/auth.controller.ts";
import { getRoles, register } from "../controllers/user.controller.ts";
import userValidator from "../middlewares/User/user.middleware.ts";

const router = express.Router();

router.post("/register", userValidator.validateCreateUser, register);
router.post("/login", login);
router.get("/roles", getRoles);

export default router;
