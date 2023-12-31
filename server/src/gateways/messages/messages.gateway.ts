import {
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Room } from '@/models'
import { Message } from '@/@types/message'
import { RoomService } from '@/services/room/room.service'
import { Logger } from '@nestjs/common'
import { User } from '@/@types/user'
import { config } from 'dotenv'

config()

@WebSocketGateway({ cors: process.env.WEBSITE_URL })
export class MessagesGateway implements OnGatewayDisconnect, OnGatewayInit {
  private logger: Logger = new Logger('MessagesGateway')
  private totalUsers: number = 0

  constructor(private readonly roomService: RoomService) {}

  @WebSocketServer()
  server: Server

  afterInit() {
    this.logger.log('Initialized')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
    this.totalUsers++
    this.server.emit('total-users', this.totalUsers)
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)

    this.totalUsers--
    this.server.emit('total-users', this.totalUsers)

    this.disconnectUser(client)
  }

  async disconnectUser(client: Socket) {
    const room = await this.roomService.findUserByRoom(client.id)

    if (room) {
      client.broadcast.to(room._id.toString()).emit('users-changed', {
        user: client.id,
        event: 'left',
      })

      client.broadcast
        .to(room._id.toString())
        .emit('user-disconnected-videochat')

      if (room.totalUsers < 2) {
        await this.roomService.deleteRoom(room._id)
      } else {
        const newRoom = await this.roomService.removeUserFromRoom(
          room,
          client.id,
        )

        this.server
          .in(newRoom._id.toString())
          .emit('slot-room-changed', newRoom.totalUsers)
      }

      client.leave(room._id.toString())
    }
  }

  @SubscribeMessage('enter-chat-room')
  async enterChatRoom(client: Socket, chatData: User) {
    const room = await this.roomService.findUserByRoom(client.id)

    if (room) return

    const user = {
      id: client.id,
      native: chatData.native,
      learn: chatData.learn,
      type: chatData.type,
    }

    let newRoom: Partial<Room> = await this.roomService.findRandomlyRoom(user)

    if (!newRoom) {
      newRoom = await this.roomService.createRoom(user)
    } else {
      newRoom = await this.roomService.addUserToRoom(newRoom._id, user)
    }

    client.emit('chat-room-entered', {
      id: newRoom._id.toString(),
      isOwner: newRoom.owner === user.id,
    })

    client.join(newRoom._id.toString())

    client.broadcast.to(newRoom._id.toString()).emit('users-changed', {
      user: client.id,
      event: 'joined',
    })

    this.server
      .in(newRoom._id.toString())
      .emit('slot-room-changed', newRoom.totalUsers)
  }

  @SubscribeMessage('skip-chat-room')
  async skipChatRoom(client: Socket, user: User) {
    const formattedUser = {
      id: client.id,
      native: user.native,
      learn: user.learn,
      type: user.type,
    }

    let newRoom = await this.roomService.findRandomlyRoom(formattedUser)

    this.disconnectUser(client)

    if (newRoom) {
      newRoom = await this.roomService.addUserToRoom(newRoom._id, formattedUser)
    } else {
      newRoom = await this.roomService.createRoom(formattedUser)
    }

    client.emit('chat-room-entered', {
      id: newRoom._id.toString(),
      isOwner: newRoom.owner === user.id,
    })

    client.join(newRoom._id.toString())

    client.broadcast.to(newRoom._id.toString()).emit('users-changed', {
      user: client.id,
      event: 'joined',
    })

    this.server
      .in(newRoom._id.toString())
      .emit('slot-room-changed', newRoom.totalUsers)
  }

  @SubscribeMessage('add-message')
  addMessage(client: Socket, message: Message) {
    this.server.in(message.roomId).emit('message', {
      text: message.text,
      from: client.id,
    })
  }

  @SubscribeMessage('video-chat-join')
  videoChatJoin(client: Socket, data: { peerId: string; roomId: string }) {
    client.to(data.roomId).emit('video-answer', { peerId: data.peerId })
  }

  @SubscribeMessage('video-menu-mic')
  videoMenuMic(client: Socket, data: { roomId: string; micStatus: boolean }) {
    client.to(data.roomId).emit('video-menu-mic', data.micStatus)
  }

  @SubscribeMessage('video-menu-cam')
  videoMenuCam(client: Socket, data: { roomId: string; camStatus: boolean }) {
    client.to(data.roomId).emit('video-menu-cam', data.camStatus)
  }
}
