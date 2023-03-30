import { CategoryUpdateRequest } from '@shop/types'
import { IsString } from 'class-validator'

export class CategoryUpdateDto implements CategoryUpdateRequest {
	@IsString()
	readonly title?: string

	@IsString()
	readonly descriptions?: string

	@IsString()
	readonly icon?: string
}
