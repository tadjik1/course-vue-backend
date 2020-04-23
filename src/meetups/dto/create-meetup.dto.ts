import { CreateAgendaItemDto } from './create-agenda-item.dto';
import {
  Allow,
  IsArray,
  IsDateString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMeetupDto {
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  readonly title: string;

  @IsNotEmpty({ message: 'Описание не может быть пустым' })
  readonly description: string;

  @IsNotEmpty({ message: 'Название не может быть пустым' })
  @IsDateString({ message: 'Некорректный формат даты' })
  readonly date: string;

  @Allow()
  readonly imageId: number;

  @IsNotEmpty({ message: 'Место не может быть пустым' })
  readonly place: string;

  @ValidateNested()
  @Type(() => CreateAgendaItemDto)
  readonly agenda: CreateAgendaItemDto[];
}
