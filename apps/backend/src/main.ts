/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule)
	const globalPrefix = 'api'
	app.setGlobalPrefix(globalPrefix)
	await app.listen(3000)
	Logger.log(`🚀 Application is running on: http://localhost:${3000}/${globalPrefix}`)
}

bootstrap()
