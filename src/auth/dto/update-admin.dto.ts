import {IsInt, IsOptional, IsPositive, IsString, MinLength} from 'class-validator';

export class UpdateAdminDto {
	@IsString()
	@MinLength(1)
	@IsOptional()
	firstname?: string;
	
	@IsString()
	@IsOptional()
	lastname?: string;
	
	@IsString()
	@IsOptional()
	email?:string;

	@IsInt()
	@IsPositive()
	@IsOptional()
	phone?:number;

	@IsString()
	@IsOptional()
	logo?:string;

}
