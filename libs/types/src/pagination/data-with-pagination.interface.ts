import { Pagination } from './pagination.interface'

export interface DataWithPagination<T> {
	data: T[]
	pagination: Pagination
}
