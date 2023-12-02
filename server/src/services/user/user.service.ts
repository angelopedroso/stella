import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Room, User } from '@/models'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModal: Model<User>,
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    const createdUser = new this.UserModal(user)
    return createdUser.save()
  }

  async updateUser(userId: string | ObjectId, user: User): Promise<User> {
    const userUpdated = await this.UserModal.findByIdAndUpdate(userId, user, {
      new: true,
    })

    return userUpdated
  }

  async updateUserRoom(userId: string, room: Room): Promise<User> {
    const user = await this.UserModal.findById(userId).exec()
    user.room = room
    return user.save()
  }

  async findByClientId(id: string): Promise<User> {
    const user = await this.UserModal.findOne({ clientId: id }).exec()

    return user
  }

  async deleteUser(userId: string | ObjectId): Promise<void> {
    await this.UserModal.deleteOne({ _id: userId })
  }
}
