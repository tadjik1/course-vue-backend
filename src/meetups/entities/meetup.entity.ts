import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from 'mikro-orm';
import { UserEntity } from '../../users/user.entity';
import { AgendaItemEntity } from './agenda-item.entity';
import { CreateMeetupDto } from '../dto/create-meetup.dto';
import { ImageEntity } from '../../images/image.entity';

@Entity({ tableName: 'meetups' })
export class MeetupEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  description?: string;

  @Property()
  date!: Date;

  @Property()
  place!: string;

  @OneToOne()
  image?: ImageEntity;

  @ManyToOne()
  organizer!: UserEntity;

  @OneToMany(
    () => AgendaItemEntity,
    (agendaEvent) => agendaEvent.meetup,
  )
  agenda = new Collection<AgendaItemEntity>(this);

  @ManyToMany({
    entity: () => UserEntity,
    pivotTable: 'participation',
    joinColumn: 'meetup_id',
    inverseJoinColumn: 'user_id',
  })
  participants = new Collection<UserEntity>(this);

  @Property({ persist: false })
  organizing?: boolean = false;

  @Property({ persist: false })
  attending?: boolean = false;

  constructor(meetupDto: Partial<CreateMeetupDto>) {
    this.title = meetupDto.title;
    this.description = meetupDto.description;
    this.date = new Date(meetupDto.date);
    this.place = meetupDto.place;
  }
}
