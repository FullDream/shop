import { Body, Controller, Post, Get } from '@nestjs/common'
import { User } from '@prisma/client'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get()
	async getAll(): Promise<any> {
		return 'fdddff'
	}

	@Post()
	async createUser(@Body() user): Promise<User> {
		return this.userService.create(user)
	}
}
