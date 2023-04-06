import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from './core/configs'
import { JwtModule } from '@nestjs/jwt'
import { CategoryModule } from './category/category.module'
import { PrismaModule } from 'nestjs-prisma'
@Module({
	imports: [
		ConfigModule.forRoot(),
		PrismaModule.forRoot({ isGlobal: true }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		AuthModule,
		UsersModule,
		CategoryModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
