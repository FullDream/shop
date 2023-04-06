import { CategoryCreateRequest } from '@shop/types'
import { IsOptional, IsString } from 'class-validator'

export class CategoryCreateDto implements CategoryCreateRequest {
	@IsString()
	readonly title: string

	@IsString()
	@IsOptional()
	readonly descriptions?: string

	@IsString()
	@IsOptional()
	readonly icon?: string
}
