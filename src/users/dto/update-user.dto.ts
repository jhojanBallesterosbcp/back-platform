import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsInt, IsOptional, IsPositive, IsString, MinLength} from 'class-validator';

export class UpdateUserDto {
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
