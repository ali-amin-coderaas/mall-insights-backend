import express from "express";
import shopController from "../controllers/shop.controller";
import shopValidator from "../middlewares/Shop/shop.middleware";
const router = express.Router();

router.get(
	"/:accountId/shops",
	shopValidator.validateShopQuery(),
	shopController.getShops
);
router.get("/industries", shopController.getShopIndustries);

router.get(
	"/:accountId/shops/:shop_id",
	shopValidator.validateShopId(),
	shopController.getShop
);
router.post(
	"/:accountId/shops",
	shopValidator.validateCreateShop(),
	shopController.createShop
);
router.put(
	"/:accountId/shops/:shop_id",
	shopValidator.validateUpdateShop(),
	shopController.updateShopById
);
router.delete(
	"/:accountId/shops/:shop_id",
	shopValidator.validateShopId(),
	shopController.deleteShopById
);

export default router;
