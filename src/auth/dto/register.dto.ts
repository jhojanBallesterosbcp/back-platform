import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;


	@IsString()
	@IsOptional()
  company?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
