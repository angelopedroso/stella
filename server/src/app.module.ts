import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MessagesGateway } from './gateways/messages/messages.gateway'
import { RoomsController } from './controllers/room/room.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Room, RoomSchema } from './models'
import { configDotenv } from 'dotenv'
import { RoomService } from './services/room/room.service'

configDotenv()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL, {}),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  controllers: [AppController, RoomsController],
  providers: [AppService, MessagesGateway, RoomService],
})
export class AppModule {}
