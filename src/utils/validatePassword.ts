import bcrypt from "bcrypt";
export const validatePassword = async (
	inputPassword: string,
	storedPassword: string
) => {
	return await bcrypt.compare(inputPassword, storedPassword);
};
