import { Transaction } from "@prisma/client";
import { QueryFilters } from "../../../types/queryInterfaces";
import { CreateTransaction } from "../../../types/transactionInterfaces";

export type Order = "asc" | "desc";

export type TransactionQueryType =
	| " yearly"
	| "monthly"
	| "weekly"
	| "daily"
	| "hourly"
	| "raw";

interface TransactionFilters extends QueryFilters {
	startDate?: Date;
	endDate?: Date;
	shopId?: number;
	accountId?: number;
	type: TransactionQueryType;
}
interface TransactionCountFilters {
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
	getTransactionCount(filters: TransactionCountFilters): Promise<number>;
};
