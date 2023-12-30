import { INestApplication, Injectable } from '@nestjs/common'
import { ExpressPeerServer } from 'peer'

@Injectable()
export class PeerService {
  enablePeerServer(app: INestApplication) {
    app.use(
      ExpressPeerServer(app.getHttpServer(), {
        path: '/peer',
        port: 8001,
      }),
    )
  }
}
