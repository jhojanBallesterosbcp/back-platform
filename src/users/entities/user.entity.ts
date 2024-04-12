import {hash} from "bcryptjs";
import {Company} from "src/company/entities/company.entity";
import {Role} from "src/roles/entities/role.entity";
import {BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
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

	@ManyToMany(()=>Company, company=>company.users,{
		eager:true,
	})
	company: Company[];
	@ManyToMany(() =>Role,roles=>roles.users,{
		eager:true
	}) 
	@JoinTable()
	roles: Role[];

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword(){
		if(!this.password) return;
		this.password = await hash(this.password, 10)
	}
}
