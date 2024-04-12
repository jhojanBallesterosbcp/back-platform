import {IsOptional, IsInt, IsPositive, IsString, MinLength} from "class-validator";

export class CreateAdminDto {

	@IsString()
	@MinLength(1)
	firstname: string;
	
	@IsString()
	lastname: string;
	
	@IsString()
	password: string;
	
	@IsString()
	email:string;

	@IsInt()
	@IsPositive()
	phone:number;

	@IsString()
	@IsOptional()
	logo?:string;
}