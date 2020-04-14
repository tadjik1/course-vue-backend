import { CreateAgendaItemDto } from './create-agenda-item.dto';

export class CreateMeetupDto {
  readonly title: string;
  readonly description: string;
  readonly date: number;
  readonly cover: string;
  readonly place: string;
  readonly agenda: CreateAgendaItemDto[];
}
