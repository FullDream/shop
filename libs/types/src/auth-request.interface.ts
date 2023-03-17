import { User } from '@prisma/client'

export interface AuthRequest extends Pick<User, 'email'> {
	password: string
}
