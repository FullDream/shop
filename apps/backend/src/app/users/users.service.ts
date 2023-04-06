import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.UserCreateInput): Promise<User | null> {
		return this.prisma.user.create({ data })
	}
}
