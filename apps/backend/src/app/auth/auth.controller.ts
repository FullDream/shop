import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common/pipes'

import { UserWithToken } from '@shop/types'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto): Promise<UserWithToken> {
		const oldUser = await this.authService.findUser(dto.email)
		if (oldUser) {
			throw new BadRequestException('user ect')
		}

		const user = await this.authService.createUser(dto)

		return this.authService.userWithToken(user)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { email, password }: AuthDto): Promise<UserWithToken> {
		const user = await this.authService.validateUser(email, password)
		return this.authService.userWithToken(user)
	}
}
