import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongoose'

@Schema()
export class User {
  _id: ObjectId | string

  @Prop({ required: true })
  clientId: string

  @Prop({ required: true })
  native: string

  @Prop({ required: true })
  learn: string
}

export const UserSchema = SchemaFactory.createForClass(User)
