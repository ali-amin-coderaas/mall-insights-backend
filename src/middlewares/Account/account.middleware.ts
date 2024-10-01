import { NextFunction, Request, Response } from "express";
import AccountService from "../../services/Account/account.service";
import { handleError } from "../../utils/responseHelper";

const AccountMiddleware = {
	async isAccountFound(req: Request, res: Response, next: NextFunction) {
		const { accountId } = req.params;
		const account = await AccountService.getAccountById(Number(accountId));

		if (!account) {
			return handleError(
				res,
				404,
				{ message: "Account not found" },
				req,
				"Fetch Account"
			);
		}

		next();
	},
};

export default AccountMiddleware;
