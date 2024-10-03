import express from "express";
import dataController from "../controllers/data.controller";
import AccountMiddleware from "../middlewares/Account/account.middleware";
const router = express.Router();

router.get(
	"/accounts/:accountId/sales",
	AccountMiddleware.isAccountFound,
	dataController.getAccountTransactions
);

router.get(
	"/accounts/:accountId/shops/:shopId/sales",
	AccountMiddleware.isAccountFound,

	dataController.getShopTransactions
);

export default router;
