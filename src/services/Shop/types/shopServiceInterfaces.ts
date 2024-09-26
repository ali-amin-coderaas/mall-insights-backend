import QueryString from "qs";
import { CreateShop, Industry, Shop } from "../../../types/shopInterfaces";

export type ShopServiceProps = {
	getAllShops(
		accountId: number,
		page: number,
		pageSize: number,
		searchQuery: string,
		sortBy: string,
		order: string
	): Promise<{ shops: Shop[]; totalItems: number }>;

	getShopById(shop_id: number, accountId: number): Promise<Shop | null>;

	createShop(data: CreateShop): Promise<Shop>;
	updateShop(accountId: number, shop_id: number, data: Shop): Promise<Shop>;

	deleteShop(accountId: number, shop_id: number): Promise<Shop>;

	getIndustries(): Promise<Industry[]>;
};
