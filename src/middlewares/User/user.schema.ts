import Joi from "joi";

const UserSchemas = {
	createUser: Joi.object({
		first_name: Joi.string().max(255).required(),
		last_name: Joi.string().max(255).required(),
		role_id: Joi.number().integer().required(),
		email: Joi.string().email().required(),
		password: Joi.string().max(255).required(),
	}),
};

export default UserSchemas;
