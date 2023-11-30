import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Room, User } from '@/models'
import { Message } from '@/@types/message'

@WebSocketGateway({ cors: '*' })
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

      await this.usersModel.deleteOne({ _id: user._id })
    }
  }

  @SubscribeMessage('set-clientId')
  setClientId(client: Socket, clientId: string) {
    this.clientIds[client.id] = clientId
    this.server.emit('users-changed', { user: clientId, event: 'joined' })
  }

  @SubscribeMessage('enter-chat-room')
  async enterChatRoom(client: Socket, data: Room) {
    let user = await this.usersModel.findOne({ clientId: client.id })

    if (!user) {
      user = await this.usersModel.create({
        learn: data.learn,
        native: data.native,
        clientId: client.id,
      })
    } else {
      user.clientId = client.id
      user = await this.usersModel.findByIdAndUpdate(user._id, user, {
        new: true,
      })
    }

    const dataRoom = await this.roomsModel.aggregate<Room>([
      {
        $match: {
          status: 'waiting',
          connectedUsers: 1,
          native: user.learn,
          learn: user.native,
        },
      },
      { $sample: { size: 1 } },
    ])

    if (!dataRoom[0] || dataRoom[0].connectedUsers >= 2) {
      const data = await this.roomsModel.create({
        connectedUsers: 1,
        learn: user.learn,
        native: user.native,
        status: 'waiting',
      })

      user.room = data
      await this.usersModel.findByIdAndUpdate(user._id, user, {
        new: true,
      })

      client.join(data._id.toString())

      client.broadcast
        .to(data._id.toString())
        .emit('users-changed', { event: 'joined' })

      return
    }

    user.room = dataRoom[0]
    await this.usersModel.findByIdAndUpdate(user._id, user, {
      new: true,
    })

    this.roomsModel.findByIdAndUpdate(dataRoom[0]._id, {
      connectedUsers: dataRoom[0].connectedUsers + 1,
      status: 'call',
    })

    client.join(dataRoom[0]._id.toString())

    client.broadcast
      .to(dataRoom[0]._id.toString())
      .emit('users-changed', { event: 'joined' })
  }

  @SubscribeMessage('add-message')
  addMessage(message: Message) {
    this.server.in(message.roomId).emit('message', {
      text: message.text,
      from: message.ownerId,
    })
  }
}
