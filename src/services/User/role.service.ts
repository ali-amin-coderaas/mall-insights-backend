import { prisma } from "../config.ts";

const RoleService = {
	async getAllRoles() {
		return await prisma.role.findMany({
			deletedAt: null,
		});
	},

	async getAllPermissions() {
		return await prisma.permission.findMany({
			deletedAt: null,
		});
	},
};

export default RoleService;
