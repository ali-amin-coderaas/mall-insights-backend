import { prisma } from "../config";

const DataServices = {
	async getAccountTransactions(
		accountId: number,
		startDate: Date,
		endDate: Date
	) {
		return await prisma.transaction.findMany({
			where: {
				shop: {
					accountId: accountId,
				},
				dateTime: {
					gte: startDate,
					lte: endDate,
				},
			},
		});
	},

	async getShopTransactions(
		shopId: number,
		accountId: number,
		startDate: Date,
		endDate: Date
	) {
		return await prisma.transaction.findMany({
			where: {
				shop: {
					accountId: accountId,
				},
				shopId: shopId,
				dateTime: {
					gte: startDate,
					lte: endDate,
				},
			},
		});
	},
};

export default DataServices;
