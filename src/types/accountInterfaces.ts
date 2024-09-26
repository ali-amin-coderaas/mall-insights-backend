export type Account = {
	id: number;
	name: string;
	type_id: number;
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
