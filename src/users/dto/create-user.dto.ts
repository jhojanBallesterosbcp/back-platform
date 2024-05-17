import {IsOptional, IsInt, IsPositive, IsString, MinLength} from "class-validator";

export class CreateUserDto {

	@IsString()
	@MinLength(1)
	name: string;

	@IsString()
	password: string;
	
	@IsString()
	email:string;

	@IsString()
	@IsOptional()
  company?: string;
}
