import express from "express";
import AccountController from "../controllers/account.controller";
import shopController from "../controllers/shop.controller";
const router = express.Router();

router.get(
	"/accounts/:accountId/sales",
	AccountController.getAccountTransactions
);

router.get("/shops/:shopId/sales", shopController.getShopTransactions);

export default router;
