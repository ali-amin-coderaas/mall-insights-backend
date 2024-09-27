export interface Transaction {
	id: number;
	amount: number;
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
