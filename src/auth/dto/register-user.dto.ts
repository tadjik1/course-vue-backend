import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  readonly fullname!: string;

  @IsEmail({}, { message: 'Email адрес должен быть валидным' })
  readonly email!: string;

  @MinLength(6, { message: 'Пароль должен состоять как минимум из 6 символов' })
  readonly password!: string;
}
