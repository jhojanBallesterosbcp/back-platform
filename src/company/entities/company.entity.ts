import {User} from "src/users/entities/user.entity";
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Company {
	//@Column({primary:true, generated: true})
	@PrimaryGeneratedColumn()
	id:number;

	@Column()
	name:string;
	
	@Column()
	address: string;
	
	@ManyToMany(()=>User, user=>user.company)
	@JoinTable()
	users:User[];
}
