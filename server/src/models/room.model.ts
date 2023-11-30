import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongoose'

@Schema()
export class Room {
  _id: ObjectId | string

  @Prop({ required: true, enum: ['waiting', 'call'] })
  status: string

  @Prop({ required: true })
  native: string

  @Prop({ required: true })
  learn: string

  @Prop({ min: 0, max: 2 })
  connectedUsers: number
}

export const RoomSchema = SchemaFactory.createForClass(Room)
