import Joi from "joi";

const AccountSchemas = {
	getAllAccounts: Joi.object({
		page: Joi.number().integer().min(1).default(1),
		pageSize: Joi.number().integer().min(1).default(10),
		q: Joi.string().allow("").optional(),
		sortBy: Joi.string().valid("name", "createdAt").default("createdAt"), // adjust based on valid fields
		order: Joi.string().valid("ASC", "DESC").default("ASC"),
	}),

	accountId: Joi.object({
		accountId: Joi.number().integer().required(),
	}),

	createAccount: Joi.object({
		name: Joi.string().min(3).max(50).required(),
		typeId: Joi.number().integer().required(),
		//Other fields go here
	}),

	updateAccount: Joi.object({
		name: Joi.string().min(3).max(50).optional(),
		accountId: Joi.number().integer().optional(),
		//Other fields go here
	}),
};

export default AccountSchemas;
