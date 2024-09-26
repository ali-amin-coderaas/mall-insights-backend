export type Account = {
	id: number;
	name: string;
	typeId: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
};

export type AccountType = {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
};

export type CreateAccount = Omit<
	Account,
	"id" | "createdAt" | "updatedAt" | "deletedAt"
>;
