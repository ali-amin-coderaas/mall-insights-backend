import { Request, Response } from "express";
import AccountService from "../services/Account/account.service";
import { Account } from "../types/accountInterfaces";
import { Data } from "../types/responseInterfaces"; // Assuming you have a Data interface
import { handleError, handleSuccess } from "../utils/responseHelper";

// Fetch all accounts
const getAll = async (req: Request, res: Response) => {
	const searchQuery = (req.query.q as string) || "";
	const page = Number(req.query.page) || 1;
	const pageSize = Number(req.query.pageSize) || 10;
	const sortBy = (req.query.sortBy as string) || "createdAt";
	const order = (req.query.order as string) || "ASC";

	try {
		const data = await AccountService.getAllAccounts(
			page,
			pageSize,
			searchQuery,
			sortBy,
			order
		);

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
};

// Fetch account by ID
const getById = async (req: Request, res: Response) => {
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

		return handleSuccess<Account>(res, 200, responseData, req, "Fetch Account");
	} catch (error) {
		return handleError(res, 500, error, req, "Fetch Account");
	}
};

const create = async (req: Request, res: Response) => {
	const { name, typeId } = req.body;

	const typeId = parseInt(typeId);

	try {
		const newAccountId = await AccountService.createAccount({
			name,
			typeId: typeId,
		});

		const responseData = {
			items: [{ accountId: newAccountId }],
			pagination: null,
			links: null,
		};

		return handleSuccess(res, 201, responseData, req, "Create Account");
	} catch (error) {
		return handleError(res, 500, error, req, "Create Account");
	}
};

// Update account
const update = async (req: Request, res: Response) => {
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
};

// Delete account
const destroy = async (req: Request, res: Response) => {
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
};

// Get account types
const getAccountTypes = async (req: Request, res: Response) => {
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
};

export default {
	getAccountTypes,
	create,
	getAll,
	getById,
	update,
	destroy,
};
