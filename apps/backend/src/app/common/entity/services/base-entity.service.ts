import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EntityService } from '../abstractions'
import { MODEL_NAME_TOKEN } from '../tokens'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class BaseEntityService<Entity, CreateDto, UpdateDto> extends EntityService<
	Entity,
	CreateDto,
	UpdateDto
> {
	constructor(
		protected readonly prisma: PrismaService,
		@Inject(MODEL_NAME_TOKEN) protected entityName: string,
	) {
		super(prisma, entityName)
	}

	findAll(): Promise<Entity[]> {
		return this.prisma[this.entityName].findMany()
	}
	async find(id: string): Promise<Entity> {
		const result = await this.prisma[this.entityName].findUnique({ where: { id } })

		if (!result) {
			throw new NotFoundException()
		}
		return result
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
