import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Please provide a valid email' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @Length(6, 20, { message: 'Password length should be between 6 and 20 characters' })
    password: string;
}
