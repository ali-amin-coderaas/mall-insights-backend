import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/User/user.service";
import { handleError, handleSuccess } from "../utils/responseHelper";
import { validatePassword } from "../utils/validatePassword";

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return handleError(res, 400, "Missing email or password", req, "Login");
	}

	try {
		const foundUser = await UserService.findUserByEmail(email);

		if (!foundUser) {
			return handleError(res, 404, "User not found", req, "Login");
		}

		const isPasswordValid = await validatePassword(
			password,
			foundUser.password
		);

		if (!isPasswordValid) {
			return handleError(res, 401, "Invalid password", req, "Login");
		}

		const secret = process.env.JWT_SECRET;
		if (!secret) {
			return handleError(res, 500, "JWT secret is not defined", req, "Login");
		}

		const token = jwt.sign({ id: foundUser.id, email }, secret, {
			expiresIn: "1h",
		});

		const responseData = {
			items: [token],
			pagination: null,
			links: null,
		};

		return handleSuccess(res, 200, responseData, req, "Login");
	} catch (error) {
		return handleError(res, 500, error, req, "Login");
	}
};
