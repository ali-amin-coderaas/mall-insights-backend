import { Request, Response } from "express";
import ShopService from "../services/Shop/shop.service";
import { Data } from "../types/responseInterfaces";
import { Industry, Shop } from "../types/shopInterfaces";
import { handleError, handleSuccess } from "../utils/responseHelper";

const getShops = async (req: Request, res: Response) => {
	let { accountId } = req.params;
	const searchQuery = (req.query.q as string) || "";
	const page = Number(req.query.page) || 1;
	const pageSize = Number(req.query.pageSize) || 10;
	const sortBy = (req.query.sortBy as string) || "createdAt";
	const order = (req.query.order as string) || "ASC";

	try {
		// Call the getAllShops function with the necessary parameters
		const data = await ShopService.getAllShops(
			Number(accountId),
			page,
			pageSize,
			searchQuery,
			sortBy,
			order
		);

		const { shops, totalItems } = data;
		const pagination = {
			currentPage: page,
			pageSize: pageSize,
			totalItems,
			totalPages: Math.ceil(totalItems / pageSize),
		};

		const responseData: Data<Shop> = {
			items: shops,
			pagination: pagination,
			links: null,
		};

		// Send a successful response with the data, pagination, and links
		return handleSuccess(res, 200, responseData, req, "Fetch shops");
	} catch (error) {
		// Handle any errors that occur during the process
		return handleError(res, 500, error, req, "Fetch shops");
	}
};

const createShop = async (req: Request, res: Response) => {
	let accountId = parseInt(req.params.accountId);
	const { name, businessName, email, industryId, address, phone } = req.body;

	try {
		const newShop = await ShopService.createShop({
			name,
			businessName,
			email,
			industryId,
			address,
			phone,
			accountId,
		});
		const responseData: Data<Shop> = {
			items: [newShop],
			pagination: null,
			links: null,
		};

		return handleSuccess(res, 201, responseData, req, "Create shop");
	} catch (error) {
		return handleError(res, 500, error, req, "Create shop");
	}
};
const getShop = async (req: Request, res: Response) => {
	const { accountId, shopId } = req.params;
	try {
		const shop = await ShopService.getShopById(
			Number(accountId),
			Number(shopId)
		);

		const responseData: Data<Shop | null> = {
			items: [shop],
			pagination: null,
			links: null,
		};

		if (!shop) {
			return handleError(res, 404, "Shop not found", req, "Fetch Shop");
		}
		return handleSuccess(res, 200, responseData, req, "Fetch Shop");
	} catch (error) {
		return handleError(res, 500, error, req, "Fetch Shop");
	}
};

const updateShopById = async (req: Request, res: Response) => {
	const { shopId, accountId } = req.params;
	const fieldsToUpdate = req.body;

	try {
		if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
			return handleError(res, 400, "No fields to update", req, "Update Shop");
		}

		const updatedShop = await ShopService.updateShop(
			Number(accountId),
			Number(shopId),
			fieldsToUpdate
		);

		const responseData: Data<Shop> = {
			items: [updatedShop],
			pagination: null,
			links: null,
		};

		if (!updatedShop) {
			return handleError(res, 404, "Shop not found", req, "Update Shop");
		}

		return handleSuccess(res, 200, responseData, req, "Update Shop");
	} catch (error) {
		return handleError(res, 500, error, req, "Update Shop");
	}
};

const deleteShopById = async (req: Request, res: Response) => {
	const { accountId, shopId } = req.params;
	try {
		const result = await ShopService.deleteShop(
			Number(accountId),
			Number(shopId)
		);

		const responseData = {
			items: [{ message: "Shop deleted successfully" }],
			pagination: null,
			links: null,
		};

		if (!result) {
			return handleError(res, 404, "Shop not found", req, "Delete Shop");
		}
		return handleSuccess(res, 200, responseData, req, "Delete Shop");
	} catch (error) {
		return handleError(res, 500, error, req, "Delete Shop");
	}
};

const getShopIndustries = async (req: Request, res: Response) => {
	try {
		const shopIndustries = await ShopService.getIndustries();

		const responseData: Data<Industry | null> = {
			items: shopIndustries,
			pagination: null,
			links: null,
		};

		return handleSuccess(res, 200, responseData, req, "Shops  by industry");
	} catch (error) {
		return handleError(res, 500, error, req, "Shops  by industry");
	}
};

export default {
	getShopIndustries,
	getShops,
	updateShopById,
	createShop,
	getShop,
	deleteShopById,
};
