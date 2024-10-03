import express from "express";
import shopController from "../controllers/shop.controller";
import AccountMiddleware from "../middlewares/Account/account.middleware";
import shopSchemas from "../middlewares/Shop/shop.schema";
import validate from "../middlewares/utils/validate";

const router = express.Router();

router.get(
	"/:accountId/shops",
	AccountMiddleware.isAccountFound,
	validate(shopSchemas.accountId, "params"),
	validate(shopSchemas.getAllShops, "query"),
	shopController.getAllShops
);
router.get("/industries", shopController.getShopIndustries);

router.get(
	"/:accountId/shops/:shopId",
	AccountMiddleware.isAccountFound,

	validate(shopSchemas.getShop, "params"),
	shopController.getShopById
);
router.post(
	"/:accountId/shops/:shopId/monthly",
	AccountMiddleware.isAccountFound,
	validate(shopSchemas.accountId, "params"),
	validate(shopSchemas.getShop, "params"),
	shopController.verifyMonthlySales
);
router.post(
	"/:accountId/shops",
	AccountMiddleware.isAccountFound,
	validate(shopSchemas.accountId, "params"),
	validate(shopSchemas.createShop),

	shopController.createShop
);
router.put(
	"/:accountId/shops/:shopId",
	AccountMiddleware.isAccountFound,
	validate(shopSchemas.accountId, "params"),
	validate(shopSchemas.getShop, "params"),
	validate(shopSchemas.updateShop, "params"),
	shopController.updateShop
);
router.delete(
	"/:accountId/shops/:shopId",
	AccountMiddleware.isAccountFound,
	validate(shopSchemas.accountId, "params"),
	validate(shopSchemas.shopId, "params"),
	shopController.deleteShop
);

export default router;
