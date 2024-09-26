export type Shop = {
	id: number;
	name: string;
	businessName: string;
	email: string;
	industry_id: number;
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
