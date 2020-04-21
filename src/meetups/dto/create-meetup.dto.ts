import { CreateAgendaItemDto } from './create-agenda-item.dto';

export class CreateMeetupDto {
  readonly title: string;
  readonly description: string;
  readonly date: number;
  readonly imageId: number;
  readonly place: string;
  readonly agenda: CreateAgendaItemDto[];
}
