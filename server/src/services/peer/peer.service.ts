import { Injectable } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ExpressPeerServer } from 'peer'

@Injectable()
export class PeerService {
  enablePeerServer(app: NestExpressApplication) {
    app.use(
      ExpressPeerServer(app.getHttpServer(), {
        path: '/peer',
      }),
    )
  }
}
