export type QueryFilters = {
	sortBy: string;
	order: "asc" | "desc";
	page: number;
	pageSize: number;
	q: string;
};
