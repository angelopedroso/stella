import { Test, TestingModule } from '@nestjs/testing'
import { RoomsController } from './room.controller'

describe('RoomController', () => {
  let controller: RoomsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
    }).compile()

    controller = module.get<RoomsController>(RoomsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
