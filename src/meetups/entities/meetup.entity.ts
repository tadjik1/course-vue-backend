import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from 'mikro-orm';
import { UserEntity } from '../../users/user.entity';
import { AgendaItemEntity } from './agenda-item.entity';
import { MeetupDto } from '../dto/meetup.dto';
import { CreateMeetupDto } from '../dto/create-meetup.dto';

@Entity({ tableName: 'meetups' })
export class MeetupEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  description?: string;

  @Property()
  cover?: string;

  @Property()
  date!: Date;

  @ManyToOne()
  organizer!: UserEntity;

  @Property()
  place!: string;

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
    this.cover = meetupDto.cover;
    this.date = new Date(meetupDto.date);
    this.place = meetupDto.place;
  }
}
