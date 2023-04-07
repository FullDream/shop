import { Type } from '@nestjs/common'
import { EntityService } from '../abstractions'
import { PrismaService } from 'nestjs-prisma'

export interface EntityModuleConfig {
	prismaModelName: keyof PrismaService
	entityService?: Type<EntityService<any, any>>
}
