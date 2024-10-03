import express from "express";
import AccountController from "../controllers/account.controller";
import AccountSchemas from "../middlewares/Account/account.schema";
import validate from "../middlewares/utils/validate";
const router = express.Router();

router.get(
	"/",
	validate(AccountSchemas.getAllAccounts, "query"),
	AccountController.getAllAccounts
);
router.get("/types", AccountController.getAccountTypes);

router.get(
	"/:accountId",
	validate(AccountSchemas.accountId, "params"),

	AccountController.getAccountById
);
router.post(
	"/",
	validate(AccountSchemas.createAccount, "query"),
	AccountController.createAccount
);

router.put(
	"/:accountId",

	validate(AccountSchemas.accountId, "params"),
	validate(AccountSchemas.updateAccount),

	AccountController.updateAccount
);
router.delete(
	"/:accountId",

	validate(AccountSchemas.accountId, "params"),

	AccountController.deleteAccount
);

export default router;
