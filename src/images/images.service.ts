import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'nestjs-mikro-orm';
import { ImageEntity } from './image.entity';
import { EntityManager, EntityRepository } from 'mikro-orm';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imagesRepository: EntityRepository<ImageEntity>,
    private readonly em: EntityManager,
  ) {}

  async saveImage(
    file: Express.Multer.File,
    user: UserEntity,
  ): Promise<ImageEntity> {
    this.em.merge(user);
    const image = new ImageEntity();
    image.data = file.buffer;
    image.mimetype = file.mimetype;
    image.size = file.size;
    image.user = user;
    await this.imagesRepository.persistAndFlush(image);
    return image;
  }

  async getImage(id: number): Promise<ImageEntity> {
    return this.imagesRepository.findOne(id);
  }
}
