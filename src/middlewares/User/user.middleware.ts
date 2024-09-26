import validate from "../utils/validate.ts";
import UserSchemas from "./user.schema.ts";

const validateCreateUser = () => {
	return validate(UserSchemas.createUser);
};

export default {
	validateCreateUser,
};
