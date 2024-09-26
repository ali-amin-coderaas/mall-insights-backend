import { NextFunction, Request, Response } from "express";
import Joi, { Schema } from "joi";
import { handleError } from "../../utils/responseHelper";

// Define the type for the request object key (e.g., body, params, query)
type RequestType = "body" | "params" | "query";

// Strongly typed validate middleware
const validate = (schema: Schema, type: RequestType = "body") => {
	return (req: Request, res: Response, next: NextFunction): void => {
		// Validate the request[type] (e.g., req.body or req.params) using Joi
		const { error, value } = schema.validate(req[type], { abortEarly: false });

		if (error) {
			// If there is a validation error, call the error handler
			handleError(res, 400, error, req, "Shops");
			return;
		}

		// Replace the original request[type] with the validated and sanitized value
		req[type] = value;
		// Call the next middleware
		next();
	};
};

export default validate;
