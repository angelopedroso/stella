import { User } from '@/@types/user'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongoose'

@Schema()
export class Room {
  _id: ObjectId | string

  @Prop({ required: true })
  roomId: string

  @Prop({ required: true, enum: ['waiting', 'call'] })
  status: string

  @Prop({ required: true, enum: ['text', 'voice'] })
  type: string

  @Prop({ required: true })
  native: string

  @Prop({ required: true })
  learn: string

  @Prop({ required: true, default: 0, max: 2 })
  totalUsers: number

  @Prop({ required: true, maxlength: 2 })
  users: User[]
}

export const RoomSchema = SchemaFactory.createForClass(Room)
