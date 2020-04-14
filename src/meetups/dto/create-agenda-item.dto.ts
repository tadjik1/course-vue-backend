import { ApiProperty } from '@nestjs/swagger';

export class CreateAgendaItemDto {
  readonly startsAt: string;
  readonly endsAt: string;

  @ApiProperty({
    enum: ['registration', 'opening', 'talk', 'coffee', 'closing', 'other'],
  })
  readonly type:
    | 'registration'
    | 'opening'
    | 'talk'
    | 'coffee'
    | 'closing'
    | 'other';
  readonly title?: string;
  readonly description?: string;
  readonly speaker?: string;

  @ApiProperty({
    enum: ['RU', 'EN'],
  })
  readonly language?: 'RU' | 'EN';
}
