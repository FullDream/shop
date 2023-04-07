import { DynamicModule, Module } from '@nestjs/common'
import { EntityService } from './abstractions'
import { BaseEntityService } from './services'
import { MODEL_NAME_TOKEN } from './tokens'
import { EntityModuleConfig } from './types'
import { PaginationModule } from '../pagination'

@Module({})
export class EntityModule {
	static forFeature(config: EntityModuleConfig): DynamicModule {
		return {
			module: EntityModule,
			imports: [PaginationModule],
			providers: [
				{ provide: EntityService, useClass: config?.entityService || BaseEntityService },
				{ provide: MODEL_NAME_TOKEN, useValue: config.prismaModelName },
			],
			exports: [EntityService],
		}
	}
}
