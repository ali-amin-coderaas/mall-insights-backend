import express from "express";
import accountController from "../controllers/account.controller";
import accountValidator from "../middlewares/Account/account.middleware";
const router = express.Router();

router.get(
	"/",
	accountValidator.validateAccountQuery,
	accountController.getAll
);
router.get("/types", accountController.getAccountTypes);
router.post(
	"/",
	accountValidator.validateCreateAccount,
	accountController.create
);
router.get(
	"/:accountId",
	accountValidator.validateAccountId,
	accountController.getById
);
router.put(
	"/:accountId",
	accountValidator.validateUpdateAccount,
	accountController.update
);
router.delete(
	"/:accountId",
	accountValidator.validateAccountId,
	accountController.destroy
);

export default router;
