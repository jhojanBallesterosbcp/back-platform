import {Column, Entity, ManyToMany} from "typeorm";
import {RoleName} from "../rol.enum";
import {User} from "src/users/entities/user.entity";

@Entity()
export class Role {
	@Column({primary: true, generated: true})
	id: number;

	@Column({type: 'varchar'})
	roleName: RoleName;
   
	@ManyToMany(()=>User, user=>user.roles)
	users: User[];
}
