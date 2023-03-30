import { Injectable } from '@nestjs/common'
import { Category } from '@prisma/client'
import { PrismaService } from '../common/services'
import { CategoryCreateDto } from './dto/category-create.dto'
import { CategoryUpdateDto } from './dto/category-update.dto'

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	findAll(): Promise<Category[]> {
		return this.prisma.category.findMany()
	}
	find(id: string): Promise<Category> {
		return this.prisma.category.findUnique({ where: { id } })
	}

	create(data: CategoryCreateDto): Promise<Category> {
		return this.prisma.category.create({ data })
	}

	update(id: string, data: CategoryUpdateDto): Promise<Category> {
		return this.prisma.category.update({ where: { id }, data })
	}

	delete(id: string): Promise<Category> {
		return this.prisma.category.delete({ where: { id } })
	}
}
