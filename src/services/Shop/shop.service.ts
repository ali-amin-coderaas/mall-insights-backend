import { prisma } from "../config";
import { ShopServiceProps } from "./types/shopServiceInterfaces";

const ShopService: ShopServiceProps = {
	async getAllShops(accountId, page, pageSize, searchQuery, sortBy, order) {
		const shops = await prisma.shop.findMany({
			where: {
				deletedAt: null,
				accountId: accountId,
				name: {
					contains: searchQuery,
				},
			},
			orderBy: {
				[sortBy]: order.toLocaleLowerCase(),
			},
			skip: (page - 1) * pageSize,
			take: pageSize, //limit
		});

		const totalItems = await prisma.shop.count({
			where: {
				deletedAt: null,
				accountId: accountId,
				name: {
					contains: searchQuery,
				},
			},
		});

		return {
			shops,
			totalItems,
		};
	},

	async getShopById(shopId, accountId) {
		return await prisma.shop.findUnique({
			where: {
				accountId: accountId,
				id: shopId,
			},
		});
	},

	async createShop(data) {
		return await prisma.shop.create({ data });
	},

	async updateShop(accountId, shopId, data) {
		return await prisma.shop.update({
			where: {
				id: shopId,
				accountId: accountId,
			},
			data,
		});
	},

	async deleteShop(accountId, shopId) {
		return await prisma.shop.update({
			where: {
				id: shopId,
				accountId: accountId,
			},
			data: {
				deletedAt: new Date(),
			},
		});
	},

	async getIndustries() {
		return await prisma.shopIndustry.findMany();
	},
};

export default ShopService;
