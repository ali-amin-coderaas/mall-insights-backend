export interface Response {
	status: {
		code: number;
		message: string;
		timestamp: string;
		path: string;
		method: string;
		requestId: string | null;
	};
	meta: {
		version: string;
		api: string;
		environment: string;
		executionTime: string;
	};
}

export interface SuccessResponse<T> extends Response {
	data: Data<T>;
	error: null;
}

export interface ErrorResponse extends Response {
	data: null;
	error: {
		message: string;
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
