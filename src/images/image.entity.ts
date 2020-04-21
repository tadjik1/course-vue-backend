import { Entity, ManyToOne, PrimaryKey, Property } from 'mikro-orm';
import { BlobEntityType } from './blob.entity.type';
import { UserEntity } from '../users/user.entity';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ tableName: 'images' })
export class ImageEntity {
  @PrimaryKey()
  id!: number;

  @Property({ type: BlobEntityType })
  @ApiHideProperty()
  @Exclude()
  data: Buffer;

  @Property()
  @ApiHideProperty()
  @Exclude()
  mimetype: string;

  @Property()
  @ApiHideProperty()
  @Exclude()
  size: number;

  @ManyToOne()
  @ApiHideProperty()
  @Exclude()
  user: UserEntity;
}
