import { Room, User } from '@/models'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly RoomModel: Model<Room>,
  ) {}

  async createRoom({ _id: userId, native, learn }: User): Promise<Room> {
    const createdRoom = await this.RoomModel.create({
      learn,
      native,
      status: 'waiting',
      totalUsers: 1,
    })

    const room = await this.RoomModel.findByIdAndUpdate(
      createdRoom._id,
      {
        $push: { connectedUsers: userId },
      },
      { new: true },
    )

    return room.save()
  }

  async findRandomlyRoom(user: User): Promise<Room> {
    const room = await this.RoomModel.aggregate<Room>([
      {
        $match: {
          status: 'waiting',
          totalUsers: 1,
          native: user.learn,
          learn: user.native,
        },
      },
      { $sample: { size: 1 } },
    ])

    return room[0]
  }

  async addUserToRoom(roomId: Room['_id'], userId: User['_id']): Promise<Room> {
    const room = await this.RoomModel.findByIdAndUpdate(roomId, {
      $push: { connectedUsers: userId },
      $inc: { totalUsers: 1 },
      status: 'call',
    })

    return room.save()
  }

  async removeUserFromRoom(
    room: Room,
    userId: string | ObjectId,
  ): Promise<void> {
    await this.RoomModel.findByIdAndUpdate(room._id, {
      connectedUsers: room.connectedUsers.filter(
        (u) => u._id.toString() !== userId.toString(),
      ),
    })
  }

  async deleteRoom(roomId: string | ObjectId): Promise<void> {
    await this.RoomModel.findByIdAndDelete(roomId)
  }
}
