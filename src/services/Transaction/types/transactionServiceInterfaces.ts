import { Transaction } from "@prisma/client";
import { QueryFilters } from "../../../types/queryInterfaces";
import { CreateTransaction } from "../../../types/transactionInterfaces";

export type Order = "asc" | "desc";

interface TransactionFilters extends QueryFilters {
	startDate?: Date;
	endDate?: Date;
	shopId?: number;
	accountId?: number;
}
export type TransactionServiceProps = {
	getTransactions(
		filters: TransactionFilters
	): Promise<{ transactions: Transaction[]; totalItems: number }>;
	getTransactionById(id: number): Promise<Transaction | null>;
	createTransaction(data: CreateTransaction): Promise<Transaction>;
	updateTransaction(id: number, data: CreateTransaction): Promise<Transaction>;
	deleteTransaction(id: number): Promise<Transaction>;
};
