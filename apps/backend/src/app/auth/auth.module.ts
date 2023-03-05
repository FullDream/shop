import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

import { Module } from '@nestjs/common'
import { PrismaService } from '../common/services'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'
import { getJWTConfig } from '../core/configs'
import { PassportModule } from '@nestjs/passport'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		PassportModule,
		ConfigModule,
	],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
