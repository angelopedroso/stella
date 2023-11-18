import { Model, Schema } from 'mongoose'

export type roomType = {
  native: string
  learn: string
}

interface Room {
  status: 'waiting' | 'call'
  type: roomType
  usersQt: number
}

const roomSchema = new Schema<Room>({
  status: { type: String, enum: ['waiting', 'call'] },
  type: {
    native: String,
    learn: String,
  },
  usersQt: { type: Number, min: 1, max: 2 },
})

export const room = new Model('room', roomSchema)
