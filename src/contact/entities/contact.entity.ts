import {Company} from "src/company/entities/company.entity";
import {Column, DeleteDateColumn, Entity, ManyToOne} from "typeorm";

@Entity()
export class Contact {
	@Column({ primary: true, generated: true })
  id: number;

  @Column()
  firstName: string;
  
	@Column()
  lastName?: string;
	
	@Column()
  Nationality: string;
	
	@Column()
  country: string;
	
	@Column()
  State: string;
	
	@Column()
  gender: string;
	
  @DeleteDateColumn()
  deletedAt: Date;

	@ManyToOne(()=> Company, company => company.id,{
		eager:true
	})
	company:Company
}
