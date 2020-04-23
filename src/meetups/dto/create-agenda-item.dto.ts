import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsIn, IsMilitaryTime, IsNotEmpty } from 'class-validator';
import { AgendaItemsTypes, agendaItemsTypes } from '../agenda-item-types';

export class CreateAgendaItemDto {
  @IsNotEmpty()
  @IsMilitaryTime({
    message: 'Некорректный формат времени начала. Требуется HH:MM',
  })
  readonly startsAt: string;

  @IsNotEmpty()
  @IsMilitaryTime({
    message: 'Некорректный формат времени окончания. Требуется HH:MM',
  })
  readonly endsAt: string;

  @ApiProperty({
    enum: agendaItemsTypes,
  })
  @IsIn(agendaItemsTypes)
  readonly type: AgendaItemsTypes;

  @Allow()
  readonly title?: string;

  @Allow()
  readonly description?: string;

  @Allow()
  readonly speaker?: string;

  @ApiProperty({
    enum: ['RU', 'EN'],
  })
  @Allow()
  readonly language?: 'RU' | 'EN';
}
