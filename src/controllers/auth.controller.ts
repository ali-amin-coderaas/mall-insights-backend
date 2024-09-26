import bodyParser from "body-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserService from "../services/User/user.service.ts";
import { validatePassword } from "../utils/validatePassword.ts";

dotenv.config();

export const login = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	console.log("Attempting to log in with email: ", email);

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}

	try {
		const user = await UserService.findUserByEmail(email);

		if (!user) {
			console.log("User not found with email: ", email);
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const isValidPassword = await validatePassword(password, user.password);

		if (!isValidPassword) {
			console.log("Invalid password for user with email: ", email);
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		console.log("Generated token for user with email: ", email);

		return res.status(200).json({ token: token });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: "An error occurred while logging in" });
	}
};
