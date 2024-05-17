import {IsOptional, IsString, MinLength} from "class-validator";

export class CreateCompanyDto {


	@IsString()
	@MinLength(3)
	name:string

	@IsOptional()
	@IsString()
	readonly address?: string;


}
