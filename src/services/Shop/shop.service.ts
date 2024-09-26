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
				[sortBy]: order,
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

	async getShopById(shop_id, accountId) {
		return await prisma.shop.findUnique({
			where: {
				accountId: accountId,
				id: shop_id,
			},
		});
	},

	async createShop(data) {
		return await prisma.shop.create({ data });
	},

	async updateShop(accountId, shop_id, data) {
		return await prisma.shop.update({
			where: {
				id: shop_id,
				accountId: accountId,
			},
			data,
		});
	},

	async deleteShop(accountId, shop_id) {
		return await prisma.shop.update({
			where: {
				id: shop_id,
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
