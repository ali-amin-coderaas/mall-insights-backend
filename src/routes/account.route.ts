import express from "express";
import accountController from "../controllers/account.controller";
import AccountSchemas from "../middlewares/Account/account.schema";
import validate from "../middlewares/utils/validate";
const router = express.Router();

router.get(
	"/",
	validate(AccountSchemas.getAllAccounts, "query"),
	accountController.getAll
);
router.get("/types", accountController.getAccountTypes);
router.post(
	"/",
	validate(AccountSchemas.createAccount, "query"),
	accountController.create
);
router.get(
	"/:accountId",
	validate(AccountSchemas.accountId, "params"),

	accountController.getById
);
router.put(
	"/:accountId",
	validate(AccountSchemas.accountId, "params"),
	validate(AccountSchemas.updateAccount),

	accountController.update
);
router.delete(
	"/:accountId",
	validate(AccountSchemas.accountId, "params"),
	accountController.destroy
);

export default router;
