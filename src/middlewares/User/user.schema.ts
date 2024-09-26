import Joi from "joi";

const UserSchemas = {
	createUser: Joi.object({
		firstName: Joi.string().max(255).required(),
		lastName: Joi.string().max(255).required(),
		roleId: Joi.number().integer().required(),
		email: Joi.string().email().required(),
		password: Joi.string().max(255).required(),
	}),
};

export default UserSchemas;
