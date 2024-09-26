import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleError } from "../../utils/responseHelper";

dotenv.config();

const secret = process.env.JWT_SECRET as string; // Ensure JWT_SECRET is properly cast as a string

// Extend the Express Request interface to include a `user` property
interface AuthenticatedRequest extends Request {
	user?: string | JwtPayload;
}

// Middleware to authenticate the JWT token
const authenticateToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): void => {
	const authHeader = req.headers["authorization"];

	// Check if authorization header exists and extract the token
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return handleError(res, 401, "Unauthorized", req, "Authentication");
	}

	// Verify the token using the secret
	jwt.verify(token, secret, (err, user) => {
		if (err) {
			return handleError(res, 403, "Forbidden", req, "Authentication"); // Forbidden if token is invalid
		}

		// Attach the user to the request object for future use
		req.user = user;

		// Continue to the next middleware
		next();
	});
};

export default authenticateToken;
