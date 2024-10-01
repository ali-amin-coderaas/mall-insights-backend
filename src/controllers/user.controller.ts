import bcrypt from "bcrypt";
import { Request, Response } from "express";
import RoleService from "../services/User/role.service";
import UserService from "../services/User/user.service";
import { Data } from "../types/responseInterfaces";
import { Role, User } from "../types/userInterfaces";
import { handleError, handleSuccess } from "../utils/responseHelper";

export const register = async (req: Request, res: Response) => {
	const firstName: string = req.body.firstName;
	const lastName: string = req.body.lastName;
	const email: string = req.body.email;
	const password: string = req.body.password;
	const roleId: number = req.body.roleId;

	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		//make sure email is unique
		const existingUser = await UserService.findUserByEmail(email);
		if (existingUser) {
			return handleError(
				res,
				409,
				"Email already in use",
				req,
				"Register User"
			);
		}
		const newUser = await UserService.registerUser(
			firstName,
			lastName,
			email,
			hashedPassword,
			roleId
		);

		const responseData: Data<User> = {
			items: [newUser],
			pagination: null,
			links: null,
		};
		return handleSuccess<User>(res, 201, responseData, req, "Register User");
	} catch (error) {
		console.error("Error registering new user: ", error);
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
