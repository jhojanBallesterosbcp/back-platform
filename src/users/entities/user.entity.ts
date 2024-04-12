import {Company} from "src/company/entities/company.entity";
import {Role} from "src/roles/entities/role.entity";
import {Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:'users'})
export class User {
	//@PrimaryGeneratedColumn()
	@Column({primary: true, generated: true})
	id: number;
	
	@Column({type: 'varchar'})
	firstname: string;
	
	@Column()
	lastname: string;
	
	@Column()
	password: string;
	
	@Column()
	email:string;

	@Column()
	phone:number;

	@Column()
	logo:string;

	@DeleteDateColumn()
	deletedAt:Date;

	@ManyToMany(()=>Company, company=>company.users,{
		eager:true,
	})
	company: Company[];
	@ManyToMany(() =>Role,roles=>roles.users,{
		eager:true
	}) 
	@JoinTable()
	roles: Role[];
}
