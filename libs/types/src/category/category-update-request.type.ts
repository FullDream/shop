import { Prisma } from '@prisma/client'

export type CategoryUpdateRequest = Omit<Prisma.CategoryUpdateInput, 'id'>
