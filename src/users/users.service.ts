import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {CreateCompanyDto} from 'src/company/dto/create-company.dto';
import {Company} from 'src/company/entities/company.entity';
import {RegisterDto} from 'src/auth/dto/register.dto';


@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>
	) {}

	async create(createUserDto: RegisterDto) {
const company = await this.validatedCompany(createUserDto.company)
    return await this.userRepository.save({ 
		...createUserDto,
	company:company
		}
		);
  }

	findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

	async findUserById(id: number) {
		const user = await  this.userRepository.findOneBy({id});
		const { password, ...rest} = user
		return rest
	}

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

	private  async validatedCompany (company:string){
		const companyEntity = await this.companyRepository.findOneBy({
			name: company
		})

		return companyEntity
	}
}
