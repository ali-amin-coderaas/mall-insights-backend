import { Request, Response } from "express";
import dataService from "../services/Data/data.service";
import { handleError, handleSuccess } from "../utils/responseHelper";

const dataController = {
	async getAccountTransactions(req: Request, res: Response) {
		const { accountId } = req.params;
		const { fromDate, toDate } = req.query;

		try {
			const transactions = await dataService.getAccountTransactions(
				Number(accountId),
				new Date(fromDate as string),
				new Date(toDate as string)
			);

			const responseData = {
				items: transactions,
				pagination: null,
				links: null,
			};

			return handleSuccess(
				res,
				200,
				responseData,
				req,
				"Get Account Transactions"
			);
		} catch (error) {
			return handleError(res, 500, error, req, "Get Account Transactions");
		}
	},

	async getShopTransactions(req: Request, res: Response) {
		const { accountId, shopId } = req.params;
		const { fromDate, toDate } = req.query;

		try {
			const transactions = await dataService.getShopTransactions(
				Number(accountId),
				Number(shopId),
				new Date(fromDate as string),
				new Date(toDate as string)
			);

			const responseData = {
				items: transactions,
				pagination: null,
				links: null,
			};

			return handleSuccess(
				res,
				200,
				responseData,
				req,
				"Get Shop Transactions"
			);
		} catch (error) {
			return handleError(res, 500, error, req, "Get Shop Transactions");
		}
	},
};

export default dataController;
