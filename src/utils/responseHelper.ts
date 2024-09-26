import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
	Data,
	ErrorResponse,
	SuccessResponse,
} from "../types/responseInterfaces"; // Assuming these interfaces are defined in responseInterfaces

const requestId = uuidv4();

// Success handler
function handleSuccess<T>(
	res: Response,
	statusCode: number,
	data: Data<T>,
	req: Request,
	entityName: string
): void {
	const startTime = Date.now();

	// Create a SuccessResponse object
	const successResponse: SuccessResponse<T> = {
		status: {
			code: statusCode,
			message: res.statusMessage || "OK",
			timestamp: new Date().toISOString(),
			path: req.url,
			method: req.method,
			requestId: requestId || null,
		},
		data: {
			items: data.items, // Ensure this matches the Data<T> type
			pagination: data.pagination || null,
			links: data.links || null,
		},
		error: null,
		meta: {
			version: "1.0.0",
			api: `${entityName} API`,
			environment: process.env.NODE_ENV || "development",
			executionTime: `${Date.now() - startTime}ms`,
		},
	};

	// Return the success response
	res.status(statusCode).json(successResponse);
}

// Error handler
function handleError(
	res: Response,
	statusCode: number,
	error: Error | any,
	req: Request,
	entityName: string
): void {
	const startTime = Date.now();

	// Create an ErrorResponse object
	const errorResponse: ErrorResponse = {
		status: {
			code: statusCode,
			message: error.message || "An error occurred",
			timestamp: new Date().toISOString(),
			path: req.url,
			method: req.method,
			requestId: requestId || null,
		},
		data: null,
		error: {
			message: error.message,
		},
		meta: {
			version: "1.0.0",
			api: `${entityName} API`,
			environment: process.env.NODE_ENV || "development",
			executionTime: `${Date.now() - startTime}ms`,
		},
	};

	// Return the error response
	res.status(statusCode).json(errorResponse);
}

export { handleError, handleSuccess };
