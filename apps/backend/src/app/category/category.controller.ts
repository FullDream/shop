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
import { CategoryService } from './category.service'
import { CategoryCreateDto } from './dto/category-create.dto'
import { CategoryUpdateDto } from './dto/category-update.dto'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	findAll(): Promise<Category[]> {
		return this.categoryService.findAll()
	}

	@Get(':id')
	find(@Param('id') id: string): Promise<Category> {
		return this.categoryService.find(id)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	create(@Body() data: CategoryCreateDto): Promise<Category> {
		return this.categoryService.create(data)
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	update(@Param('id') id: string, @Body() data: CategoryUpdateDto): Promise<Category> {
		return this.categoryService.update(id, data)
	}

	@Delete(':id')
	delete(@Param('id') id: string): Promise<Category> {
		return this.categoryService.delete(id)
	}
}
