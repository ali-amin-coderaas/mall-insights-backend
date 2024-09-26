import bcrypt from "bcrypt";
import UserService from "../services/User/user.service.ts";
import { handleError, handleSuccess } from "../utils/responseHelper.ts";

export const register = async (req, res) => {
	console.log("Attempting to register user with data: ", req.body);
	const { first_name, last_name, role_id, email, password } = req.body;

	try {
		const numericRoleId = Number(role_id); // Ensure it's a number
		if (isNaN(numericRoleId)) {
			return handleError(
				res,
				400,
				"Invalid role_id: must be a number",
				req,
				"Register User"
			);
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const userId = await UserService.registerUser(
			first_name,
			last_name,
			numericRoleId, // Use the numeric role_id
			email,
			hashedPassword
		);
		console.log("User registered with id: ", userId);
		return handleSuccess(
			res,
			201,
			{ userId },
			req,
			null,
			null,
			"Register User"
		);
	} catch (error) {
		console.error("Error registering user", error);
		return handleError(res, 500, error, req, "Register User");
	}
};

export const getRoles = async (req, res) => {
	try {
		const roles = await UserService.getRoles();
		return handleSuccess(res, 200, roles, req, null, null, "Fetch Roles");
	} catch (error) {
		return handleError(res, 500, error, req, "Fetch Roles");
	}
};
