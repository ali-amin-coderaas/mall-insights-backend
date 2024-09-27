import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
	const adminUser = await prisma.user.create({
		data: {
			firstName: "Admin",
			lastName: "Admin",
			email: "admin@mall-insights.com",
			password: "admin123",
		},
	});
	const roles = await prisma.role.createMany({
		data: [
			{
				name: "Admin",
			},
			{
				name: "Account Manager",
			},
		],
	});

	const userRoles = await prisma.userRole.createMany({
		data: [{ userId: adminUser.id, roleId: 1 }],
	});

	const permissions = await prisma.permission.createMany({
		data: [
			{ id: 1, name: "CREATE_USER" },
			{ id: 2, name: "DELETE_USER" },
			{ id: 3, name: "EDIT_USER" },
			{ id: 4, name: "READ_USER" },
			{ id: 5, name: "CREATE_ACCOUNT" },
			{ id: 6, name: "DELETE_ACCOUNT" },
			{ id: 7, name: "EDIT_ACCOUNT" },
			{ id: 8, name: "READ_ACCOUNT" },
			{ id: 9, name: "CREATE_SHOP" },
			{ id: 10, name: "DELETE_SHOP" },
			{ id: 11, name: "EDIT_SHOP" },
			{ id: 12, name: "READ_SHOP" },
		],
	});

	const rolePermissions = await prisma.rolePermission.createMany({
		data: [
			//? Admin Role (roleId: 1) gets all permissions
			{ roleId: 1, permissionId: 1 }, // CREATE_USER
			{ roleId: 1, permissionId: 2 }, // DELETE_USER
			{ roleId: 1, permissionId: 3 }, // EDIT_USER
			{ roleId: 1, permissionId: 4 }, // READ_USER
			{ roleId: 1, permissionId: 5 }, // CREATE_ACCOUNT
			{ roleId: 1, permissionId: 6 }, // DELETE_ACCOUNT
			{ roleId: 1, permissionId: 7 }, // EDIT_ACCOUNT
			{ roleId: 1, permissionId: 8 }, // READ_ACCOUNT
			{ roleId: 1, permissionId: 9 }, // CREATE_SHOP
			{ roleId: 1, permissionId: 10 }, // DELETE_SHOP
			{ roleId: 1, permissionId: 11 }, // EDIT_SHOP
			{ roleId: 1, permissionId: 12 }, // READ_SHOP

			//? Manager Role (roleId: 2)
			{ roleId: 2, permissionId: 7 }, // EDIT_ACCOUNT
			{ roleId: 2, permissionId: 8 }, // READ_ACCOUNT
			{ roleId: 2, permissionId: 9 }, // CREATE_SHOP
			{ roleId: 2, permissionId: 10 }, // DELETE_SHOP
			{ roleId: 2, permissionId: 11 }, // EDIT_SHOP
			{ roleId: 2, permissionId: 12 }, // READ_SHOP
		],
	});

	const accountTypes = await prisma.accountType.createMany({
		data: [
			{
				name: "Personal",
			},
			{
				name: "Business",
			},
			{
				name: "Other",
			},
		],
	});

	const shopIndustries = await prisma.shopIndustry.createMany({
		data: [
			{
				name: "Electronics",
			},
			{
				name: "Clothing",
			},
			{
				name: "Books",
			},
			{
				name: "Home & Kitchen",
			},
			{
				name: "Beauty & Personal Care",
			},
			{
				name: "Sports & Outdoors",
			},
			{
				name: "Toys & Games",
			},
			{
				name: "Automotive",
			},
			{
				name: "Health & Household",
			},
			{
				name: "Jewelry & Accessories",
			},
			{
				name: "Pet Supplies",
			},
			{
				name: "Office Supplies",
			},
			{
				name: "Musical Instruments",
			},
			{
				name: "Arts & Crafts",
			},
			{
				name: "Garden & Outdoor",
			},
		],
	});

	const saleTypes = await prisma.saleType.createMany({
		data: [
			{
				name: "In-Store",
			},
			{
				name: "Delivery",
			},
		],
	});
	console.log({
		adminUser,
		userRoles,
		roles,
		permissions,
		rolePermissions,
		accountTypes,
		shopIndustries,
		saleTypes,
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
