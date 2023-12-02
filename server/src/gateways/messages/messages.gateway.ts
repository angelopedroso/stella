import {
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Room, User } from '@/models'
import { Message } from '@/@types/message'
import { RoomService } from '@/services/room/room.service'
import { UserService } from '@/services/user/user.service'
import { Logger } from '@nestjs/common'

@WebSocketGateway({ cors: '*' })
export class MessagesGateway implements OnGatewayDisconnect, OnGatewayInit {
  private logger: Logger = new Logger('MessagesGateway')

  constructor(
    @InjectModel(Room.name) private readonly roomsModel: Model<Room>,
    @InjectModel(User.name) private readonly usersModel: Model<User>,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server

  afterInit() {
    this.logger.log('Initialized')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)

    const user = await this.usersModel.findOne({ clientId: client.id })

    if (user) {
      const roomId = user.room._id

      this.server.emit('users-changed', {
        user,
        event: 'left',
      })

      const room = await this.roomsModel.findById(roomId).exec()

      if (room.totalUsers < 2) {
        await this.roomService.deleteRoom(roomId)
      } else {
        await this.roomService.removeUserFromRoom(room, user._id)
      }

      await this.userService.deleteUser(user._id)
    }
  }

  @SubscribeMessage('enter-chat-room')
  async enterChatRoom(client: Socket, data: Room) {
    let user = await this.userService.findByClientId(client.id)

    if (!user) {
      user = await this.userService.createUser({
        learn: data.learn,
        native: data.native,
      })
    }

    const dataRoom = await this.roomService.findRandomlyRoom(user)

    if (!dataRoom || dataRoom.totalUsers > 1) {
      const data = await this.roomService.createRoom(user)

      user.room = data

      await this.userService.updateUser(user._id, user)

      client.emit('chat-room-entered', data._id.toString())

      client.join(data._id.toString())

      client.broadcast
        .to(data._id.toString())
        .emit('users-changed', { event: 'joined' })

      return
    }

    user.room = dataRoom

    user = await this.userService.updateUser(user._id, user)

    await this.roomService.addUserToRoom(dataRoom._id, user._id)

    client.emit('chat-room-entered', dataRoom._id.toString())

    client.join(dataRoom._id.toString())

    client.broadcast
      .to(dataRoom._id.toString())
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
