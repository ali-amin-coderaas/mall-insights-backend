import { Account, AccountType } from "../../../types/accountInterfaces";

export type AccountServiceProps = {
	getAllAccounts: (
		page: number,
		pageSize: number,
		searchQuery: string,
		sortBy: string,
		order: string
	) => Promise<{ accounts: Account[]; totalItems: number }>;
	getAccountById: (id: number) => Promise<Account>;
	createAccount: (data: Account) => Promise<Account>;
	updateAccount: (id: number, data: Account) => Promise<Account>;
	deleteAccount: (id: number) => Promise<Account>;
	getTypes: () => Promise<AccountType>;
};
