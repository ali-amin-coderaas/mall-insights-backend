export type User = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	role_id: number;
	password: string;
};
export type Role = {
	id: number;
	name: string;
};

export type Permission = {
	id: number;
	name: string;
	action: string;
};

export type AuthResponse = {
	token: string;
};
