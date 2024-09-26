import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/User/user.service";
import { handleError, handleSuccess } from "../utils/responseHelper";
import { validatePassword } from "../utils/validatePassword";

export const login = async (req: Request, res: Response) => {
	const email = req.body.email;
	const password = req.body.password;

	console.log("Attempting to log in with email: ", email);

	if (!email || !password) {
		return handleError(res, 400, "Missing email or password", req, "Login");
	}

	try {
		const user = await UserService.findUserByEmail(email);

		if (!user) {
			console.log("User not found with email: ", email);
			return handleError(res, 404, "User not found", req, "Login");
		}

		const isValidPassword = await validatePassword(password, user.password);

		if (!isValidPassword) {
			console.log("Invalid password for user with email: ", email);
			return handleError(res, 401, "Invalid password", req, "Login");
		}

		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) {
			console.error("JWT secret is not defined.");
			return handleError(res, 500, "JWT secret is not defined", req, "Login");
		}

		const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
			expiresIn: "1h",
		});

		console.log("Generated token for user with email: ", email);

		const responseData = {
			items: [token],
			pagination: null,
			links: null,
		};

		return handleSuccess(res, 200, responseData, req, "Login");
	} catch (error) {
		console.error(error);
		return handleError(res, 500, error, req, "Login");
	}
};
