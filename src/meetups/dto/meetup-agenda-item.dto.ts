import { ApiProperty } from '@nestjs/swagger';
import { AgendaItemEntity } from '../entities/agenda-item.entity';

export class MeetupAgendaItemDto {
  readonly id: number;
  readonly startsAt: string;
  readonly endsAt: string;
  @ApiProperty({
    enum: ['registration', 'opening', 'talk', 'break', 'coffee', 'closing', 'afterparty', 'other'],
  })
  readonly type:
    | 'registration'
    | 'opening'
    | 'talk'
    | 'break'
    | 'coffee'
    | 'closing'
    | 'afterparty'
    | 'other';
  readonly title?: string;
  readonly description?: string;
  readonly speaker?: string;
  @ApiProperty({
    enum: ['RU', 'EN'],
  })
  readonly language?: string;

  constructor(item: AgendaItemEntity) {
    this.id = item.id;
    this.startsAt = item.startsAt;
    this.endsAt = item.endsAt;
    this.type = item.type;
    this.title = item.title;
    this.description = item.description;
    this.speaker = item.speaker;
    this.language = item.language;
  }
}
