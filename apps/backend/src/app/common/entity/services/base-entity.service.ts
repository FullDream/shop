import { Inject, Injectable } from '@nestjs/common'
import { EntityService } from '../abstractions'
import { MODEL_NAME_TOKEN } from '../tokens'
import { PrismaService } from 'nestjs-prisma'
import { DataWithPagination } from '@shop/types'
import { PaginationDto, PaginationService } from '../../pagination'

@Injectable()
export class BaseEntityService<Entity, CreateDto, UpdateDto> extends EntityService<
	Entity,
	CreateDto,
	UpdateDto
> {
	constructor(
		protected readonly prisma: PrismaService,
		@Inject(MODEL_NAME_TOKEN) protected entityName: string,
		protected paginationService: PaginationService,
	) {
		super(prisma, entityName, paginationService)
	}

	async findAll(paginationDto?: PaginationDto): Promise<DataWithPagination<Entity>> {
		return this.paginationService.generate(this.prisma[this.entityName], paginationDto)
	}
	async find(id: string): Promise<Entity> {
		return this.prisma[this.entityName].findUniqueOrThrow({ where: { id } })
	}

	create(data: CreateDto): Promise<Entity> {
		return this.prisma[this.entityName].create({ data })
	}

	update(id: string, data: UpdateDto): Promise<Entity> {
		return this.prisma[this.entityName].update({ where: { id }, data })
	}

	delete(id: string): Promise<Entity> {
		return this.prisma[this.entityName].delete({ where: { id } })
	}
}
