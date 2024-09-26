import validate from "../utils/validate";
import AccountSchemas from "./account.schema";

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
