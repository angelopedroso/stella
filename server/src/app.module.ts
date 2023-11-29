import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MessagesGateway } from './gateways/messages/messages.gateway'
import { RoomsController } from './controllers/room/room.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Room, RoomSchema, User, UserSchema } from './models'
import { configDotenv } from 'dotenv'

configDotenv()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL, {}),
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AppController, RoomsController],
  providers: [AppService, MessagesGateway],
})
export class AppModule {}
