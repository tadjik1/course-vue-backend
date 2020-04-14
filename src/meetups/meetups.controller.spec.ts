import { Test, TestingModule } from '@nestjs/testing';
import { MeetupsController } from './meetups.controller';

describe('Meetup Controller', () => {
  let controller: MeetupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetupsController],
    }).compile();

    controller = module.get<MeetupsController>(MeetupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
