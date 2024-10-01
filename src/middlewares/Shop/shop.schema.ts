import Joi from "joi";

// Define the validation schemas for the various shop operations
const shopSchemas = {
	accountId: Joi.object({
		accountId: Joi.number().integer().required(),
	}),

	shopId: Joi.object({
		shopId: Joi.number().integer().required(),
	}),
	getAllShops: Joi.object({
		page: Joi.number().integer().min(1).default(1),
		pageSize: Joi.number().integer().min(1).default(10),
		searchQuery: Joi.string().allow("").optional(),
		sortBy: Joi.string()
			.valid("name", "businessName", "email", "industry", "createdAt")
			.default("createdAt"),
		order: Joi.string().valid("ASC", "DESC").default("ASC"),
	}),

	createShop: Joi.object({
		name: Joi.string().max(255).required(),
		businessName: Joi.string().max(255).required(),
		email: Joi.string().email().required(),
		industryId: Joi.string().max(255).required(),
	}),

	updateShop: Joi.object({
		data: Joi.object({
			name: Joi.string().max(255).optional(),
			businessName: Joi.string().max(255).optional(),
			email: Joi.string().email().optional(),
			industryId: Joi.string().max(255).optional(),
		}).min(1), // At least one field is required to update
	}),
};

export default shopSchemas;
