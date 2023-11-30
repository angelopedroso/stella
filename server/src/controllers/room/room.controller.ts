import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Room, User } from '@/models'

@Controller('api/rooms')
export class RoomsController {
  constructor(@InjectModel(Room.name) private readonly model: Model<Room>) {}

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.model.findById(id)
  }

  @Post()
  save(@Body() item: Room) {
    return item._id
      ? this.model.findByIdAndUpdate(item._id, item, { new: true })
      : this.model.create(item)
  }

  @Post('/randomly')
  async findRandomly(@Body() language: User) {
    return this.model.aggregate([
      {
        $match: {
          status: 'waiting',
          connectedUsers: 1,
          native: language.learn,
          learn: language.native,
        },
      },
      { $sample: { size: 1 } },
    ])
  }
}
