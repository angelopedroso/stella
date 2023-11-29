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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], min: 0, max: 2 })
  connectedUsers: User[]
}

export const RoomSchema = SchemaFactory.createForClass(Room)
