import express from "express";
import dataController from "../controllers/data.controller";
import AccountMiddleware from "../middlewares/Account/account.middleware";
const router = express.Router();

router.get(
	"/transactions/accounts/:accountId",
	AccountMiddleware.isAccountFound,

	dataController.getAccountTransactions
);

router.get(
	"/transactions/accounts/:accountId/shops/:shopId",
	AccountMiddleware.isAccountFound,

	dataController.getShopTransactions
);

export default router;
