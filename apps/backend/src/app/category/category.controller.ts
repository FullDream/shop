import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { Category } from '@prisma/client'
import { CategoryCreateDto } from './dto/category-create.dto'
import { CategoryUpdateDto } from './dto/category-update.dto'
import { DataWithPagination } from '@shop/types'
import { EntityService } from '@shop/backend/entity'
import { PaginationDto } from '@shop/backend/pagination'

@Controller('categories')
export class CategoryController {
	constructor(
		private readonly entityService: EntityService<Category, CategoryCreateDto, CategoryUpdateDto>,
	) {}

	@Get()
	findAll(@Query() queryParams: PaginationDto): Promise<DataWithPagination<Category>> {
		return this.entityService.findAll(queryParams)
	}

	@Get(':id')
	find(@Param('id') id: string): Promise<Category> {
		return this.entityService.find(id)
	}

	@Post()
	create(@Body() data: CategoryCreateDto): Promise<Category> {
		return this.entityService.create(data)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() data: CategoryUpdateDto): Promise<Category> {
		return this.entityService.update(id, data)
	}

	@Delete(':id')
	delete(@Param('id') id: string): Promise<Category> {
		return this.entityService.delete(id)
	}
}
