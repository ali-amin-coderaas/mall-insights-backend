import { Permission, Role, User } from "../../../types/userInterfaces";

export type UserServiceProps = {
	registerUser(
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		roleId: number
	): Promise<User>;

	findUserByEmail(email: string): Promise<User>;
};

export type RoleServiceProps = {
	getAllRoles(): Promise<Role>;
	getAllPermissions(): Promise<Permission>;
};
