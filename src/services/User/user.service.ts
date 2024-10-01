import { prisma } from "../config";
import { UserServiceProps } from "./types/userServiceinterfaces.js";

const UserService: UserServiceProps = {
	async registerUser(firstName, lastName, email, roleId, password) {
		roleId = Number(roleId);
		try {
			const newUser = await prisma.user.create({
				data: { firstName, lastName, email, password },
			});
			await prisma.userRole.create({
				data: {
					userId: newUser.id,
					roleId: roleId,
				},
			});
			return newUser;
		} catch (error) {
			console.error("Error creating new user: ", error);
			throw error;
		}
	},

	async findUserByEmail(email) {
		try {
			const user = await prisma.user.findFirst({
				where: { email },
			});
			if (!user) {
				throw new Error(`User not found with email: ${email}`);
			}
			return user;
		} catch (error) {
			throw error;
		}
	},
};

export default UserService;
