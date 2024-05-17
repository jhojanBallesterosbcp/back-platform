import {hash} from "bcryptjs";
import {Role} from "../../common/enums/rol.enum";
import {Company} from "src/company/entities/company.entity";

import {BeforeInsert,BeforeUpdate,Column,DeleteDateColumn,Entity,JoinColumn,JoinTable,ManyToMany,ManyToOne,} from "typeorm";

@Entity()
export class User {
	//@PrimaryGeneratedColumn()
	@Column({primary: true,generated: true})
	id: number;

	@Column({type: 'varchar'})
	name: string;

	@Column()
	password: string;
	
	@Column({nullable:true})
	photo?: string;   

	@Column() 
	email: string;

	@DeleteDateColumn() 
	deletedAt:Date;

	@ManyToOne(() => Company, (company) =>company.id,{
		eager:true
	})
	company: Company;

	@Column({type: 'enum',default: Role.ADMIN,enum: Role})
	role: Role;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() { 
		if(!this.password) return;
		this.password=await hash(this.password,10)
	}
} 
