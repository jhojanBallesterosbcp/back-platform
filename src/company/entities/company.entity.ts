import {User} from "src/users/entities/user.entity";
import {Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Company {
	//@Column({primary:true, generated: true})
	@PrimaryGeneratedColumn()
	id:number;

	@Column()    
	name:string;
	
	@Column({ nullable: true })
	address?: string;

	@Column({ nullable: true })
	colorTheme?: string;
	
	@Column({ nullable: true })
	logo?: string;

	@DeleteDateColumn()
  deletedAt: Date;

	@OneToMany(()=>User, (user) => user.company)
	users:User[]

}   
