import { DataWithPagination } from '@shop/types'
import { PaginationDto } from '../dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PaginationService {
	async generate<T>(
		prismaModel: any,
		paginationDto?: PaginationDto,
	): Promise<DataWithPagination<T>> {
		const currentPage = paginationDto?.currentPage || 1
		const perPage = paginationDto?.perPage || 20
		const total = await prismaModel.count()
		const lastPage = Math.ceil(total / perPage)

		return {
			data: await prismaModel.findMany({ take: perPage, skip: (currentPage - 1) * perPage }),
			pagination: { currentPage, perPage, total, lastPage },
		}
	}
}
