import {IsOptional, IsInt, IsPositive, IsString, MinLength} from "class-validator";

export class CreateUserDto {

	@IsString()
	@MinLength(1)
	firstname: string;
	
	@IsString()
	lastname: string;
	
	@IsString()
	email:string;

	@IsInt()
	@IsPositive()
	phone:number;

	@IsString()
	@IsOptional()
	logo?:string;
}
