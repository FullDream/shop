import { User } from '@prisma/client'
import { IsEmail, IsString } from 'class-validator'

export class AuthDto implements Pick<User, 'email'> {
	@IsEmail()
	readonly email: string

	@IsString()
	readonly password: string
}
