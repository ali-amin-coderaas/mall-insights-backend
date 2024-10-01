export interface Transaction {
	id: number;
	amount: number;
	accountId: number;
	typeId: number;
	shopId: number;
	isModifiedFrom: number;
	isModifiedTo: number;
	dateTime: Date;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

export interface saleType {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

export type CreateTransaction = Omit<
	Transaction,
	| "id"
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
	| "isModifiedTo"
	| "isModifiedFrom"
>;
