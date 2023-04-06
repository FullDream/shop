import { Inject } from '@nestjs/common'
import { MODEL_NAME_TOKEN } from '../tokens/model-name.token'
import { PrismaService } from 'nestjs-prisma'

export abstract class EntityService<Entity, CreateDto, UpdateDto = CreateDto> {
	constructor(
		protected readonly prisma: PrismaService,
		@Inject(MODEL_NAME_TOKEN) protected entityName: string,
	) {
		if (!(entityName in prisma)) throw new Error('no model in the Prisma')
	}

	abstract findAll(): Promise<Entity[]>

	abstract find(id: string): Promise<Entity>

	abstract create(data: CreateDto): Promise<Entity>

	abstract update(id: string, data: UpdateDto): Promise<Entity>

	abstract delete(id: string): Promise<Entity>
}
