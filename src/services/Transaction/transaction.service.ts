import { prisma } from "../config";
import { TransactionServiceProps } from "./types/transactionServiceInterfaces";

const TransactionService: TransactionServiceProps = {
	async getTransactions(filters) {
		const transactions = await prisma.transaction.findMany({
			where: {
				deletedAt: null,
				...(filters.startDate &&
					filters.endDate && {
						dateTime: { gte: filters.startDate, lte: filters.endDate },
					}),
				...(filters.shopId && { id: filters.shopId }),
				...(filters.accountId && { shop: { accountId: filters.accountId } }),
			},
			orderBy: {
				[filters.sortBy]: filters.order?.toLocaleLowerCase(),
			},
		});

		const totalItems = await prisma.transaction.count({
			where: {
				deletedAt: null,
				...(filters.startDate &&
					filters.endDate && {
						dateTime: { gte: filters.startDate, lte: filters.endDate },
					}),
				...(filters.shopId && { id: filters.shopId }),
				...(filters.accountId && { shop: { accountId: filters.accountId } }),
			},
		});

		return { transactions, totalItems };
	},
	async getTransactionById(id) {
		return await prisma.transaction.findUnique({
			where: { id: id, deletedAt: null },
		});
	},
	async createTransaction(data) {
		return await prisma.transaction.create({ data });
	},
	async updateTransaction(id, newData) {
		// Step 1: Retrieve the old transaction
		const oldTransaction = await this.getTransactionById(id);

		if (!oldTransaction) {
			throw new Error(`Transaction with id ${id} not found`);
		}
		// Step 2: Merge old transaction data with the new data
		const updatedTransactionData = {
			amount: newData.amount ?? oldTransaction.amount,
			dateTime: newData.dateTime ?? oldTransaction.dateTime,
			typeId: newData.typeId ?? oldTransaction.typeId,
			shopId: oldTransaction.shopId,
			isModifiedFrom: oldTransaction.id, // Reference the old transaction
			isModifiedTo: null, // This will be null in the new transaction initially
		};

		// Step 3: Create a new transaction with the updated data
		const newTransaction = await this.createTransaction(updatedTransactionData);

		// Step 4: Update the old transaction to reference the new transaction
		await prisma.transaction.update({
			where: { id: oldTransaction.id },
			data: { isModifiedTo: newTransaction.id },
		});

		return newTransaction;
	},

	async deleteTransaction(id) {
		return await prisma.transaction.update({
			where: { id },
			data: { deletedAt: new Date() },
		});
	},

	async getTransactionCount(filters) {
		return await prisma.transaction.count({
			where: {
				deletedAt: null,
				...(filters.startDate &&
					filters.endDate && {
						dateTime: { gte: filters.startDate, lte: filters.endDate },
					}),
				...(filters.shopId && { id: filters.shopId }),
				...(filters.accountId && { shop: { accountId: filters.accountId } }),
			},
		});
	},
};

export default TransactionService;
