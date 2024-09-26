import QueryString from "qs";
import {
	Account,
	AccountType,
	CreateAccount,
} from "../../../types/accountInterfaces";

export type AccountServiceProps = {
	getAllAccounts: (
		page: number,
		pageSize: number,
		searchQuery: string,
		sortBy: string,
		order: string
	) => Promise<{ accounts: Account[]; totalItems: number }>;
	getAccountById: (id: number) => Promise<Account | null>;
	createAccount: (data: CreateAccount) => Promise<Account>;
	updateAccount: (id: number, data: Account) => Promise<Account>;
	deleteAccount: (id: number) => Promise<Account>;
	getTypes: () => Promise<AccountType[]>;
};
