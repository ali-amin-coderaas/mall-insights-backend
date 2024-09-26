import { prisma } from "../config";
import { UserServiceProps } from "./types/userServiceinterfaces.js";

const UserService: UserServiceProps = {
	async registerUser(first_name, last_name, email, role_id, password) {
		console.log("Attempting to register user with data: ", {
			first_name,
			last_name,
			email,
			role_id,
			password,
		});
		try {
			const newUser = await prisma.user.create({
				first_name,
				last_name,
				role_id,
				email,
				password,
			});
			console.log("User registered with id: ", newUser.id);
			return newUser;
		} catch (error) {
			console.error("Error creating new user: ", error);
			throw error;
		}
	},

	async findUserByEmail(email) {
		return await prisma.user.findOne({ where: { email: email } });
	},
};

export default UserService;
