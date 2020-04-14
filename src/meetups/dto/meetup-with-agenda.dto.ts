import { MeetupDto } from './meetup.dto';
import { MeetupAgendaItemDto } from './meetup-agenda-item.dto';
import { MeetupEntity } from '../entities/meetup.entity';

export class MeetupWithAgendaDto extends MeetupDto {
  readonly agenda: MeetupAgendaItemDto[];

  constructor(meetup: MeetupEntity) {
    super(meetup);
    this.agenda = meetup.agenda
      .getItems()
      .map((item) => new MeetupAgendaItemDto(item));
  }
}
