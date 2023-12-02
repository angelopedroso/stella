import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId, Types } from 'mongoose'
import { Room } from './room.model'

@Schema()
export class User {
  _id: ObjectId | string

  @Prop({ required: true })
  native: string

  @Prop({ required: true })
  learn: string

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  room: Room
}

export const UserSchema = SchemaFactory.createForClass(User)
