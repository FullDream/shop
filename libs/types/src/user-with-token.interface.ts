import { User } from '@prisma/client'

export interface UserWithToken {
	token: string
	user: Omit<User, 'hash'>
}
