import { prisma } from "./src/services/config";
import { CreateAccount } from "./src/types/accountInterfaces";
import { CreateShop, Shop } from "./src/types/shopInterfaces";
import { CreateTransaction } from "./src/types/transactionInterfaces";

//Accounts mock data
const mockAccounts: CreateAccount[] = [
	{
		name: "John Doe Enterprises",
		typeId: 1,
	},
	{
		name: "Acme Non-Profit",
		typeId: 2,
	},
	{
		name: "Personal Account Jane Doe",
		typeId: 3,
	},
	{
		name: "Tech Innovations LLC",
		typeId: 1,
	},
	{
		name: "Community Outreach Org",
		typeId: 2,
	},
	{
		name: "Private Account Mike Smith",
		typeId: 3,
	},
];

const mockShops: CreateShop[] = [
	{
		name: "Doe Electronics",
		businessName: "John Doe Enterprises",
		email: "contact@doeelectronics.com",
		industryId: 1,
		accountId: 1,
		address: "123 Main St, Springfield",
		phone: "555-1234",
	},
	{
		name: "Acme Books",
		businessName: "Acme Non-Profit",
		email: "info@acmebooks.org",
		industryId: 2,
		accountId: 2,
		address: "456 Elm St, Springfield",
		phone: "555-5678",
	},
	{
		name: "Jane's Boutique",
		businessName: "Personal Account Jane Doe",
		email: "jane@boutique.com",
		industryId: 3,
		accountId: 3,
		address: "789 Oak St, Springfield",
		phone: "555-8765",
	},
	{
		name: "Tech Innovators",
		businessName: "Tech Innovations LLC",
		email: "info@techinnovators.com",
		industryId: 1,
		accountId: 1,
		address: "987 Pine St, Springfield",
		phone: "555-4321",
	},
	{
		name: "Outreach Supplies",
		businessName: "Community Outreach Org",
		email: "supplies@outreach.org",
		industryId: 2,
		accountId: 2,
		address: "654 Cedar St, Springfield",
		phone: "555-6543",
	},
];

const mockTransactions: CreateTransaction[] = [
	{
		amount: 200,
		typeId: 1,
		shopId: 1,
		dateTime: new Date(),
	},
	{
		amount: 100,
		typeId: 2,
		shopId: 2,
		dateTime: new Date(),
	},
	{
		shopId: 3,
		amount: 300,
		typeId: 2,
		dateTime: new Date(),
	},
];

const createData = async () => {
	console.log("Creating accounts...");
	await prisma.account.createMany({ data: mockAccounts });
	console.log("Accounts created.");
	console.log("Creating shops...");
	await prisma.shop.createMany({ data: mockShops });
	console.log("Shops created.");
	console.log("Creating transactions...");
	await prisma.transaction.createMany({ data: mockTransactions });
	console.log("Transactions created.");
};

createData();
