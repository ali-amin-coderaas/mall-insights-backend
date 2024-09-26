import bcrypt from "bcrypt";
import { Request, Response } from "express";
import RoleService from "../services/User/role.service";
import UserService from "../services/User/user.service";
import { Data } from "../types/responseInterfaces";
import { Role, User } from "../types/userInterfaces";
import { handleError, handleSuccess } from "../utils/responseHelper";

export const register = async (req: Request, res: Response) => {
	console.log("Attempting to register user with data: ", req.body);
	const { firstName, lastName, roleId, email, password } = req.body;

	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const newUser = await UserService.registerUser(
			firstName,
			lastName,
			roleId,
			email,
			hashedPassword
		);

		const responseData: Data<User> = {
			items: [newUser],
			pagination: null,
			links: null,
		};
		console.log("User registered with id: ", newUser);
		return handleSuccess<User>(res, 201, responseData, req, "Register User");
	} catch (error) {
		console.error("Error registering user", error);
		return handleError(res, 500, error, req, "Register User");
	}
};

export const getRoles = async (req: Request, res: Response) => {
	try {
		const roles = await RoleService.getAllRoles();

		const responseData: Data<Role> = {
			items: roles,
			pagination: null,
			links: null,
		};
		return handleSuccess<Role>(res, 200, responseData, req, "Fetch Roles");
	} catch (error) {
		return handleError(res, 500, error, req, "Fetch Roles");
	}
};
