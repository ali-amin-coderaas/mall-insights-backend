import { prisma } from "../config";
import { AccountServiceProps } from "./types/accountServiceInterfaces";

const AccountService: AccountServiceProps = {
	async getAllAccounts(page, pageSize, searchQuery, sortBy, order) {
		console.log(" get all started services");

		const accounts = await prisma.account.findMany({
			where: {
				deletedAt: null,
				name: {
					contains: searchQuery,
					mode: "insensitive",
				},
			},
			orderBy: {
				[sortBy]: order,
			},
			skip: (page - 1) * pageSize,
			take: pageSize, // limit
		});
		const totalItems = await prisma.account.count({
			where: {
				name: {
					contains: searchQuery,
				},
			},
		});

		return {
			accounts,
			totalItems,
		};
	},

	async getAccountById(id) {
		return await prisma.account.findUnique({
			where: {
				id: id,
			},
		});
	},

	async createAccount(data) {
		return await prisma.account.create({ data });
	},

	async updateAccount(id: number, data) {
		return await prisma.account.update({ where: { id }, data });
	},

	async deleteAccount(id: number) {
		return await prisma.account.update({
			where: { id },
			data: { deletedAt: new Date() },
		});
	},

	async getTypes() {
		return await prisma.accountType.findMany();
	},
};

export default AccountService;
