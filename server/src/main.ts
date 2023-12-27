import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PeerServer } from 'peer'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  PeerServer({ port: 9001, path: '/peer' })
  app.enableCors({
    origin: '*',
  })
  await app.listen(8001)
}
bootstrap()
