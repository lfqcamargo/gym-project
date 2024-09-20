import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  })

  const envService = app.get(EnvService)
  const port = envService.get('PORT')

  const logger = new Logger('Bootstrap')
  logger.log(`Application is starting on port ${port}`)

  await app.listen(port)
}
bootstrap()
