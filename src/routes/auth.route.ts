import express from "express";
import { login } from "../controllers/auth.controller";
import { getRoles, register } from "../controllers/user.controller";
import UserSchemas from "../middlewares/User/user.schema";
import validate from "../middlewares/utils/validate";

const router = express.Router();

router.post("/register", validate(UserSchemas.createUser), register);
router.post("/login", login);
router.get("/roles", getRoles);

export default router;
