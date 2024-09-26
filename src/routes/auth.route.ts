import express from "express";
import { login } from "../controllers/auth.controller";
import { getRoles, register } from "../controllers/user.controller";
import userValidator from "../middlewares/User/user.middleware";

const router = express.Router();

router.post("/register", userValidator.validateCreateUser(), register);
router.post("/login", login);
router.get("/roles", getRoles);

export default router;
