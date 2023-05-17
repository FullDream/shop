import { Prisma } from '@prisma/client'

export type CategoryCreateRequest = Omit<Prisma.CategoryCreateInput, 'id' | 'slug'> & {
	slug?: string
}
