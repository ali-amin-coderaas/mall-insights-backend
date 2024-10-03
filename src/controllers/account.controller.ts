import { Transaction } from "@prisma/client";
import { Request, Response } from "express";
import AccountService from "../services/Account/account.service";
import TransactionService from "../services/Transaction/transaction.service";
import { Order } from "../services/Transaction/types/transactionServiceInterfaces";
import { Account } from "../types/accountInterfaces";
import { Data } from "../types/responseInterfaces";
import { handleError, handleSuccess } from "../utils/responseHelper";

const AccountController = {
	async getAllAccounts(req: Request, res: Response) {
		const q = (req.query.q as string) || "";
		const page = Number(req.query.page) || 1;
		const pageSize = Number(req.query.pageSize) || 10;
		const sortBy = (req.query.sortBy as string) || "createdAt";
		const order = (req.query.order as Order) || "DESC";

		try {
			const data = await AccountService.getAllAccounts({
				page,
				pageSize,
				q,
				sortBy,
				order,
			});

			const { accounts, totalItems } = data;
			const pagination = {
				currentPage: page,
				pageSize: pageSize,
				totalItems,
				totalPages: Math.ceil(totalItems / pageSize),
			};

			const responseData: Data<Account> = {
				items: accounts,
				pagination: pagination,
				links: null,
			};

			return handleSuccess<Account>(
				res,
				200,
				responseData,
				req,
				"Fetch Accounts"
			);
		} catch (error) {
			return handleError(res, 500, error, req, "Fetch Accounts");
		}
	},
	async getAccountById(req: Request, res: Response) {
		const { accountId } = req.params;

		try {
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

			const responseData: Data<Account> = {
				items: [account],
				pagination: null,
				links: null,
			};

			return handleSuccess<Account>(
				res,
				200,
				responseData,
				req,
				"Fetch Account"
			);
		} catch (error) {
			return handleError(res, 500, error, req, "Fetch Account");
		}
	},
	async createAccount(req: Request, res: Response) {
		let { name, typeId } = req.body;
		typeId = parseInt(typeId);

		try {
			const newAccount = await AccountService.createAccount({
				name,
				typeId,
			});

			const responseData = {
				items: [newAccount],
				pagination: null,
				links: null,
			};

			return handleSuccess(res, 201, responseData, req, "Create Account");
		} catch (error) {
			return handleError(res, 500, error, req, "Create Account");
		}
	},
	async updateAccount(req: Request, res: Response) {
		const { accountId } = req.params;
		const fieldsToUpdate = req.body;

		try {
			const updatedAccount = await AccountService.updateAccount(
				Number(accountId),
				fieldsToUpdate
			);

			if (!updatedAccount) {
				return handleError(
					res,
					404,
					{ message: "Account not found" },
					req,
					"Update Account"
				);
			}

			const responseData = {
				items: [updatedAccount],
				pagination: null,
				links: null,
			};

			return handleSuccess(res, 200, responseData, req, "Update Account");
		} catch (error) {
			return handleError(res, 500, error, req, "Update Account");
		}
	},
	async deleteAccount(req: Request, res: Response) {
		const { accountId } = req.params;
		try {
			const result = await AccountService.deleteAccount(Number(accountId));
			if (!result) {
				return handleError(
					res,
					404,
					{ message: "Account not found" },
					req,
					"Delete Account"
				);
			}

			const responseData = {
				items: [{ message: "Account deleted successfully" }],
				pagination: null,
				links: null,
			};

			return handleSuccess(res, 200, responseData, req, "Delete Account");
		} catch (error) {
			return handleError(res, 500, error, req, "Delete Account");
		}
	},
	async getAccountTypes(req: Request, res: Response) {
		try {
			const accountTypes = await AccountService.getTypes();

			const responseData = {
				items: [accountTypes],
				pagination: null,
				links: null,
			};

			return handleSuccess(res, 200, responseData, req, "Fetch Account Types");
		} catch (error) {
			return handleError(res, 500, error, req, "Fetch Account Types");
		}
	},
	async getAccountTransactions(req: Request, res: Response) {
		let accountId: number = Number(req.params.accountId);
		let startDate = new Date(req.query.startDate as string);
		let endDate = new Date(req.query.endDate as string);
		const page = Number(req.query.page) || 1;
		const pageSize = Number(req.query.pageSize) || 10;
		const sortBy = (req.query.sortBy as string) || "dateTime";
		const order = (req.query.order as Order) || "DESC";
		const q = (req.query.q as string) || "";

		try {
			const data = await TransactionService.getTransactions({
				accountId,
				startDate,
				endDate,
				page,
				pageSize,
				sortBy,
				order,
				q,
			});
			const { transactions, totalItems } = data;
			const paginatation = {
				currentPage: page,
				pageSize: pageSize,
				totalItems,
				totalPages: Math.ceil(totalItems / pageSize),
			};
			const responseData: Data<Transaction> = {
				items: transactions,
				pagination: paginatation,
				links: null,
			};
			handleSuccess(res, 200, responseData, req, "Fetch Account Transactions");
		} catch (error) {
			return handleError(res, 500, error, req, "Fetch Account Transactions");
		}
	},
};

export default AccountController;
