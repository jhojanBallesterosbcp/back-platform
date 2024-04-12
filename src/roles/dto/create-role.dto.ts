import {IsEnum} from "class-validator";
import {RoleName} from "../rol.enum";

export class CreateRoleDto {
	@IsEnum(RoleName)
	roleName:string
}
