// auth.dto.ts
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password length should be greater than 5' })
  password: string;
}
