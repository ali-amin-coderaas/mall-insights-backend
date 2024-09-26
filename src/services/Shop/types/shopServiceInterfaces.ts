import { Industry, Shop } from "../../../types/shopInterfaces";

export type ShopServiceProps = {
	getAllShops(
		accountId: number,
		page: number,
		pageSize: number,
		searchQuery: string,
		sortBy: string,
		order: string
	): Promise<{ shops: Shop[]; totalItems: number }>;

	getShopById(shopId: number, accountId: number): Promise<Shop>;

	createShop(
		accountId: number,
		name: string,
		businessName: string,
		email: string,
		industry_id: number
	): Promise<Shop>;
	updateShop(accountId: number, shopId: number, data: Shop): Promise<Shop>;

	deleteShop(accountId: number, shopId: number): Promise<Shop>;

	getIndustries(): Promise<Industry>;
};
