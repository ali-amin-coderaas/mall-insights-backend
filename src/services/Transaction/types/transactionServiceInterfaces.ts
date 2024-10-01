import { Transaction } from "@prisma/client";
import { CreateTransaction } from "../../../types/transactionInterfaces";

export type TransactionServiceProps = {
	getTransactions(): Promise<Transaction[]>;
	getTransactionById(id: number): Promise<Transaction | null>;
	createTransaction(data: CreateTransaction): Promise<Transaction>;
	updateTransaction(id: number, data: CreateTransaction): Promise<Transaction>;
	deleteTransaction(id: number): Promise<Transaction>;
};
