import { prisma } from "../config";

const RoleService = {
	async getAllRoles() {
		return await prisma.role.findMany({
			where: {
				deletedAt: null,
			},
		});
	},

	async getAllPermissions() {
		return await prisma.permission.findMany({
			where: {
				deletedAt: null,
			},
		});
	},
};

export default RoleService;
