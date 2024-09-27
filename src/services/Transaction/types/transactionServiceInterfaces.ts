import { Transaction } from "@prisma/client";

export type CreateTransaction = Omit<
	Transaction,
	"id" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type TransactionServiceProps = {
	getTransactions(): Promise<Transaction[]>;
	getTransactionById(id: number): Promise<Transaction | null>;
	createTransaction(data: CreateTransaction): Promise<Transaction>;
	updateTransaction(id: number, data: CreateTransaction): Promise<Transaction>;
	deleteTransaction(id: number): Promise<Transaction>;
};
