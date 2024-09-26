import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
	const roles = await prisma.role.createMany({
		data: [
			{
				name: "Admin",
			},
			{
				name: "User",
			},
		],
	});

	const permissions = await prisma.permission.createMany({
		data: [
			{
				name: "Create",
				action: "create",
			},
			{
				name: "Read",
				action: "read",
			},
			{
				name: "Update",
				action: "update",
			},
			{
				name: "Delete",
				action: "delete",
			},
		],
	});

	const rolePermissions = await prisma.rolePermission.createMany({
		data: [
			{
				role_id: 1,
				permission_id: 1,
			},
			{
				role_id: 1,
				permission_id: 2,
			},
			{
				role_id: 1,
				permission_id: 3,
			},
			{
				role_id: 1,
				permission_id: 4,
			},
			{
				role_id: 2,
				permission_id: 2,
			},
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
	console.log({
		roles,
		permissions,
		rolePermissions,
		accountTypes,
		shopIndustries,
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
