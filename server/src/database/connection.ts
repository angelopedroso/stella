import { MongooseError, connect } from 'mongoose'

export async function ConnectDB() {
  try {
    await connect(process.env.MONGODB_URI || '')
  } catch (error) {
    if (error instanceof MongooseError) {
      console.error(`${error.name} - ${error.cause}: ${error.message}`)
    }
  }
}
