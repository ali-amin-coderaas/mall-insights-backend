import { Permission, Role, User } from "../../../types/userInterfaces";

export type UserServiceProps = {
	registerUser(
		firstName: string,
		lastName: string,
		email: string,
		roleId: string,
		password: string
	): Promise<User>;

	findUserByEmail(email: string): Promise<User>;
};

export type RoleServiceProps = {
	getAllRoles(): Promise<Role>;
	getAllPermissions(): Promise<Permission>;
};
