import { User } from '@/@types/user'
import { Room } from '@/models'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly RoomModel: Model<Room>,
  ) {}

  async createRoom(user: User): Promise<Room> {
    const createdRoom = await this.RoomModel.create({
      learn: user.learn,
      native: user.native,
      status: 'waiting',
      totalUsers: 1,
      roomId: user.id,
    })

    const room = await this.RoomModel.findByIdAndUpdate(
      createdRoom._id,
      {
        $push: { users: user },
      },
      { new: true },
    )

    return room.save()
  }

  async findRandomlyRoom(user: User): Promise<Room> {
    const room = await this.RoomModel.findOne<Room>({
      status: 'waiting',
      totalUsers: 1,
      native: user.learn,
      learn: user.native,
    })

    return room
  }

  async addUserToRoom(roomId: Room['_id'], user: User): Promise<Room> {
    const room = await this.RoomModel.findByIdAndUpdate(roomId, {
      $push: { users: user },
      $inc: { totalUsers: 1 },
      status: 'call',
    })

    return room.save()
  }

  async removeUserFromRoom(room: Room, userId: User['id']): Promise<void> {
    const updateObj = {
      users: room.users.filter((u) => u.id !== userId),
      totalUsers: room.totalUsers - 1,
      status: room.totalUsers - 1 === 1 && 'waiting',
    }

    const user = room.users.find((u) => u.id === userId)
    const isOwner = user.native === room.native && user.learn === room.learn

    if (isOwner) {
      Object.assign(updateObj, {
        native: user.learn,
        learn: user.native,
      })
    }

    await this.RoomModel.findByIdAndUpdate(room._id, updateObj)
  }

  async deleteRoom(roomId: string | ObjectId): Promise<void> {
    await this.RoomModel.findByIdAndDelete(roomId)
  }

  async findUserByRoom(userId: string): Promise<Room> {
    return await this.RoomModel.findOne({
      'users.id': userId,
    }).exec()
  }
}
