import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { BaseEntityService, EntityService, MODEL_NAME_TOKEN } from '../common/entity'
import { PaginationService } from '../common/pagination'

@Module({
	controllers: [CategoryController],
	providers: [
		{ provide: EntityService, useClass: BaseEntityService },
		{ provide: MODEL_NAME_TOKEN, useValue: 'category' },
		PaginationService,
	],
})
export class CategoryModule {}
