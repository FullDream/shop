import { Type } from 'class-transformer'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

export class PaginationDto {
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@IsOptional()
	readonly currentPage?: number = 1

	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(100)
	@IsOptional()
	readonly perPage: number = 20
}
