export interface SuccessResponse<T> {
	status: {
		code: number;
		message: string;
		timestamp: string;
		path: string;
		method: string;
		requestId: string | null;
	};
	data: Data<T>;
	error: null;
	meta: {
		version: string;
		api: string;
		environment: string;
		executionTime: string;
	};
}

export interface ErrorResponse {
	status: {
		code: number;
		message: string;
		timestamp: string;
		path: string;
		method: string;
		requestId: string | null;
	};
	data: null;
	error: {
		message: string;
	};
	meta: {
		version: string;
		api: string;
		environment: string;
		executionTime: string;
	};
}

export interface Data<T> {
	items: T[];
	pagination?: Pagination | null;
	links?: null; // to be changed later
}

export type Pagination = {
	currentPage: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
};
