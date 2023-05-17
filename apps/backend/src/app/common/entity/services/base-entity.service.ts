import { Inject, Injectable } from '@nestjs/common'
import { EntityService } from '../abstractions'
import { MODEL_NAME_TOKEN } from '../tokens'
import { PrismaService } from 'nestjs-prisma'
import { DataWithPagination } from '@shop/types'
import { PaginationDto, PaginationService } from '../../pagination'
import slugify from 'slugify'

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
	async find(slug: string): Promise<Entity> {
		return this.prisma[this.entityName].findUniqueOrThrow({ where: { slug } })
	}

	create(data: CreateDto): Promise<Entity> {
		return this.prisma[this.entityName].create({ data })
	}

	update(slug: string, data: UpdateDto): Promise<Entity> {
		return this.prisma[this.entityName].update({ where: { slug }, data })
	}

	delete(slug: string): Promise<Entity> {
		return this.prisma[this.entityName].delete({ where: { slug } })
	}
}
