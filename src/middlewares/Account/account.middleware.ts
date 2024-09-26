import validate from "../utils/validate.ts";
import AccountSchemas from "./account.schema.ts";

const validateAccountQuery = () => {
	return validate(AccountSchemas.getAllAccounts, "query");
};

const validateAccountId = () => {
	return validate(AccountSchemas.getAccountById, "params");
};

const validateCreateAccount = () => {
	return validate(AccountSchemas.createAccount);
};

const validateUpdateAccount = () => {
	return validate(AccountSchemas.updateAccount);
};

export default {
	validateCreateAccount,
	validateAccountId,
	validateAccountQuery,
	validateUpdateAccount,
};
