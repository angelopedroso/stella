import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PeerServer } from 'peer'
import { configDotenv } from 'dotenv'

configDotenv()

async function bootstrap() {
  const websiteURL = process.env.WEBSITE_URL

  const app = await NestFactory.create(AppModule)
  PeerServer({ path: '/peer' })
  app.enableCors({
    origin: websiteURL,
  })
  await app.listen(8001)
}
bootstrap()
