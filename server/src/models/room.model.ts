import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId, Types } from 'mongoose'
import { User } from './user.model'

@Schema()
export class Room {
  _id: ObjectId | string

  @Prop({ required: true, enum: ['waiting', 'call'] })
  status: string

  @Prop({ required: true })
  native: string

  @Prop({ required: true })
  learn: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  connectedUsers: User[]

  @Prop({ required: true, default: 0 })
  totalUsers: number
}

export const RoomSchema = SchemaFactory.createForClass(Room)
