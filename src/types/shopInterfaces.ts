export type Shop = {
	id: number;
	accountId: number;
	name: string;
	businessName: string;
	email: string;
	address: string;
	phone: string;
	industryId: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
};

export type Industry = {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
};

export type CreateShop = Omit<
	Shop,
	"id" | "createdAt" | "updatedAt" | "deletedAt"
>;
