import { PrismaService } from 'nestjs-prisma'
import { DataWithPagination } from '@shop/types'
import { PaginationDto, PaginationService } from '../../pagination'

export abstract class EntityService<
	Entity,
	CreateDto = { slug: string; id: string },
	UpdateDto = CreateDto,
> {
	constructor(
		protected readonly prisma: PrismaService,
		protected entityName: string,
		protected paginationService: PaginationService,
	) {
		if (!(entityName in prisma)) throw new Error('no model in the Prisma')
	}

	abstract findAll(paginationDto?: PaginationDto): Promise<DataWithPagination<Entity>>

	abstract find(slug: string): Promise<Entity>

	abstract create(data: CreateDto): Promise<Entity>

	abstract update(slug: string, data: UpdateDto): Promise<Entity>

	abstract delete(slug: string): Promise<Entity>
}
