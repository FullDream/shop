import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../common/services'
import { genSalt, hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthDto } from './dto/auth.dto'
import { exclude } from '../common/utils'
import { UserWithToken } from '@shop/types'

@Injectable()
export class AuthService {
	private salt = +this.configService.get('SALT')

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async createUser(dto: AuthDto): Promise<Omit<User, 'hash'>> {
		const salt = await genSalt(this.salt)

		const user = await this.prisma.user.create({
			data: { email: dto.email, hash: await hash(dto.password, salt) },
		})

		return exclude(user, ['hash'])
	}

	async findUser(email: string): Promise<User> {
		return this.prisma.user.findFirst({ where: { email } })
	}

	async validateUser(email: string, password: string): Promise<Omit<User, 'hash'>> {
		const user = await this.findUser(email)
		if (!user) throw new UnauthorizedException('user not found')

		const isCorrectPassword = await compare(password, user.hash)
		if (!isCorrectPassword) throw new UnauthorizedException('password is wrong')

		return exclude(user, ['hash'])
	}

	async userWithToken(user: Omit<User, 'hash'>): Promise<UserWithToken> {
		return {
			user,
			token: await this.jwtService.signAsync(user),
		}
	}
}
