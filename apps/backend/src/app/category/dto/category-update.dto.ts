import { CategoryUpdateRequest } from '@shop/types'
import { IsOptional, IsString } from 'class-validator'

export class CategoryUpdateDto implements CategoryUpdateRequest {
	@IsString()
	@IsOptional()
	readonly title?: string

	@IsString()
	@IsOptional()
	readonly descriptions?: string

	@IsString()
	@IsOptional()
	readonly icon?: string
}
