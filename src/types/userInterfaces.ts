export type User = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	roleId: number;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
};
export type Role = {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
};

export type Permission = {
	id: number;
	name: string;
	action: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
};

export type AuthResponse = {
	token: string;
};
