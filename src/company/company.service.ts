import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {Company} from './entities/company.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class CompanyService {

	constructor(
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>
	){}

  async create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.save(createCompanyDto);
  }

  async findAll() {
    return await this.companyRepository.find();
  }
  async findByName(name:string) {
    return await this.companyRepository.findOneBy({name});
  }

  async findOne(id: number) {
    return `This action returns a #${id} company`;
  }

	async findWithUsers(companyId:number): Promise<Company> {
		
		const company = await this.companyRepository.findOne({ 
			where: { id: companyId },
			relations: ['users'] 
		});

		for (const user of company.users) {
			delete user.password;
		}
		return company;
  }
/*     
  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  async remove(id: number) {
    return `This action removes a #${id} company`;
  }*/
}
