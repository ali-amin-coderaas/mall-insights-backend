import QueryString from "qs";
export type User = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	roleId: number;
	password: string;
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
};

export type AuthResponse = {
	token: string;
};
