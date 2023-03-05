import { AuthModule } from './auth/auth.module'
import { PrismaService } from './common/services/prisma.service'
import { UsersModule } from './users/users.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from './core/configs'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		ConfigModule.forRoot(),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [PrismaService, AppService],
})
export class AppModule {}
