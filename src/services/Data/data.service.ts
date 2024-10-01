import { prisma } from "../config";

const DataServices = {
	async getAccountTransactions(
		accountId: number,
		fromDate: Date,
		toDate: Date
	) {
		return await prisma.transaction.findMany({
			where: {
				accountId: accountId,
				dateTime: {
					gte: fromDate,
					lte: toDate,
				},
			},
		});
	},

	async getShopTransactions(
		shopId: number,
		accountId: number,
		fromDate: Date,
		toDate: Date
	) {
		return await prisma.transaction.findMany({
			where: {
				accountId: accountId,
				shopId: shopId,
				dateTime: {
					gte: fromDate,
					lte: toDate,
				},
			},
		});
	},
};

export default DataServices;
