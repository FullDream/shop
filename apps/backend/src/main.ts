/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule)
	const globalPrefix = 'api'
	app.setGlobalPrefix(globalPrefix)

	const { httpAdapter } = app.get(HttpAdapterHost)
	app.useGlobalFilters(
		new PrismaClientExceptionFilter(httpAdapter, { P2023: HttpStatus.BAD_REQUEST }),
	)

	app.useGlobalPipes(new ValidationPipe({ transform: true }))
	await app.listen(3000)

	Logger.log(`🚀 Application is running on: http://localhost:${3000}/${globalPrefix}`)
}

bootstrap()
