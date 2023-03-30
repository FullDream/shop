import { CategoryCreateRequest } from '@shop/types'
import { IsNotEmpty, IsString } from 'class-validator'

export class CategoryCreateDto implements CategoryCreateRequest {
	@IsString()
	@IsNotEmpty()
	readonly title: string

	@IsString()
	readonly descriptions?: string

	@IsString()
	readonly icon?: string
}
