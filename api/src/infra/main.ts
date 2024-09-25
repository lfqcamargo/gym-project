import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  })

  const envService = app.get(EnvService)
  const port = envService.get('PORT')

  const allowedOrigins = [
    'http://localhost:3000', // Adicione aqui suas origens de front-end
    'http://localhost:5173',
    // Adicione outras origens conforme necessário
  ]

  app.enableCors({
    origin: (origin, callback) => {
      console.log(`Origem da requisição: ${origin}`)

      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        console.error(`Origem não permitida: ${origin}`)
        callback(new Error('Origem não permitida pelo CORS'))
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  })

  const logger = new Logger('Bootstrap')
  logger.log(`Application is starting on port ${port}`)

  const config = new DocumentBuilder()
    .setTitle('Gym Project')
    .setDescription('Gym Project')
    .setVersion('1.0')
    .addTag('Gym Project')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)
}

bootstrap()
