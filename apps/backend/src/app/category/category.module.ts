import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { EntityModule } from '../common/entity'

@Module({
	imports: [EntityModule.forFeature({ prismaModelName: 'category' })],
	controllers: [CategoryController],
})
export class CategoryModule {}
