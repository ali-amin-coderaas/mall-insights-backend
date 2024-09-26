import ShopService from "../services/Shop/shop.service.ts";
import { handleError, handleSuccess } from "../utils/responseHelper.ts";

const getShops = async (req, res) => {
	let { accountId } = req.params;
	const searchQuery = req.query.q || "";
	const page = Number(req.query.page) || 1;
	const pageSize = Number(req.query.pageSize) || 10;
	const sortBy = req.query.sortBy || "";
	const order = req.query.order || "";

	try {
		// Call the getAllShops function with the necessary parameters
		const data = await ShopService.getAllShops(
			accountId,
			page,
			pageSize,
			searchQuery,
			sortBy,
			order
		);

		const { items, totalItems, currentPage, totalPages } = data;
		const pagination = {
			currentPage,
			pageSize: data.pageSize,
			totalItems,
			totalPages,
		};

		// Send a successful response with the data, pagination, and links
		return handleSuccess(
			res,
			200,
			{ items },
			req,
			pagination,
			null,
			"Fetch shops"
		);
	} catch (error) {
		// Handle any errors that occur during the process
		return handleError(res, 500, error, req, "Fetch shops");
	}
};

const createShop = async (req, res) => {
	const { accountId } = req.params;

	const { name, businessName, email, industry } = req.body;

	try {
		const newShopId = await ShopService.createShop(
			accountId,
			name,
			businessName,
			email,
			industry
		);
		return handleSuccess(
			res,
			201,
			{ shopId: newShopId },
			req,
			null,
			null,
			"Create shop"
		);
	} catch (error) {
		return handleError(res, 500, error, req, "Create shop");
	}
};
const getShop = async (req, res) => {
	const { accountId, shopId } = req.params;
	try {
		const shop = await ShopService.getShopById(accountId, shopId);
		if (!shop) {
			return handleError(res, 404, "Shop not found", req, "Fetch Shop");
		}
		return handleSuccess(res, 200, shop, req, null, null, "Fetch Shop");
	} catch (error) {
		return handleError(res, 500, error, req, "Fetch Shop");
	}
};

const updateShopById = async (req, res) => {
	const { shopId, accountId } = req.params;
	const fieldsToUpdate = req.body;

	try {
		if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
			return res.status(400).json({ error: "No fields provided for update." });
		}

		const updatedShop = await ShopService.updateShop(
			shopId,
			accountId,
			fieldsToUpdate
		);

		if (!updatedShop) {
			return handleError(res, 404, "Shop not found", req, "Update Shop");
		}

		return handleSuccess(res, 200, updatedShop, req, null, null, "Update Shop");
	} catch (error) {
		return handleError(res, 500, error, req, "Update Shop");
	}
};

const deleteShopById = async (req, res) => {
	const { accountId, shopId } = req.params;
	try {
		const result = await ShopService.deleteShop(shopId, accountId);
		if (result.affectedRows === 0) {
			return handleError(res, 404, "Shop not found", req, "Delete Shop");
		}
		return handleSuccess(
			res,
			200,
			{ message: "Shop deleted successfully" },
			req,
			null,
			null,
			"Delete Shop"
		);
	} catch (error) {
		return handleError(res, 500, error, req, "Delete Shop");
	}
};

const getShopIndustries = async (req, res) => {
	try {
		const shopsByIndustry = await ShopService.getIndustries();
		return handleSuccess(
			res,
			200,
			shopsByIndustry,
			req,
			null,
			null,
			"Shops  by industry"
		);
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
