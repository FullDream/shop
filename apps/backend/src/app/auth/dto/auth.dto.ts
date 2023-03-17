import { AuthRequest } from '@shop/types'
import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class AuthDto implements AuthRequest {
	@IsEmail()
	@IsNotEmpty()
	readonly email: string

	@IsString()
	@IsNotEmpty()
	readonly password: string
}
