import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Room, User } from 'src/models'
import { Message } from 'src/@types/message'

@WebSocketGateway({ cors: '*:*' })
export class MessagesGateway implements OnGatewayDisconnect {
  clientIds: Map<string, string> = new Map()

  constructor(
    @InjectModel(Room.name) private readonly roomsModel: Model<Room>,
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  @WebSocketServer()
  server: Server

  async handleDisconnect(client: Socket) {
    const user = await this.usersModel.findOne({ clientId: client.id })

    if (user) {
      this.server.emit('users-changed', {
        user: this.clientIds[client.id],
        event: 'left',
      })

      user.clientId = null

      await this.usersModel.findByIdAndUpdate(user._id, user)
    }
  }

  @SubscribeMessage('set-clientId')
  setClientId(client: Socket, clientId: string) {
    this.clientIds[client.id] = clientId
    this.server.emit('users-changed', { user: clientId, event: 'joined' })
  }

  @SubscribeMessage('add-message')
  addMessage(message: Message) {
    this.server.in(message.roomId).emit('message', {
      text: message.text,
      from: message.ownerId,
    })
  }
}
