import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configDotenv } from 'dotenv'
import { PeerService } from './services/peer/peer.service'

configDotenv()

async function bootstrap() {
  const websiteURL = process.env.WEBSITE_URL
  const peerServer = new PeerService()

  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: websiteURL,
  })

  peerServer.enablePeerServer(app)
  await app.listen(8001)
}
bootstrap()
