import { Model, Schema } from 'mongoose'
import { roomType } from '@model/room'

type User = roomType

const userSchema = new Schema<User>({
  native: { type: String, required: true },
  learn: { type: String, required: true },
})

export const user = new Model('user', userSchema)
