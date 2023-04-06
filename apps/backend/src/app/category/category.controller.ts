import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Category } from '@prisma/client'
import { CategoryCreateDto } from './dto/category-create.dto'
import { CategoryUpdateDto } from './dto/category-update.dto'
import { EntityService } from '../common/entity'

@Controller('categories')
export class CategoryController {
	constructor(
		private readonly entityService: EntityService<Category, CategoryCreateDto, CategoryUpdateDto>,
	) {}

	@Get()
	findAll(): Promise<Category[]> {
		return this.entityService.findAll()
	}

	@Get(':id')
	find(@Param('id') id: string): Promise<Category> {
		return this.entityService.find(id)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	create(@Body() data: CategoryCreateDto): Promise<Category> {
		return this.entityService.create(data)
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	update(@Param('id') id: string, @Body() data: CategoryUpdateDto): Promise<Category> {
		return this.entityService.update(id, data)
	}

	@Delete(':id')
	delete(@Param('id') id: string): Promise<Category> {
		return this.entityService.delete(id)
	}
}
