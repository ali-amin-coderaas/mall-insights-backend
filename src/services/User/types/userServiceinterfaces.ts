import { User } from "../../../types/userInterfaces";

export type UserServiceProps = {
	registerUser(
		first_name: string,
		last_name: string,
		email: string,
		role_id: number,
		password: string
	): Promise<User>;

	findUserByEmail(email: string): Promise<User>;
};
