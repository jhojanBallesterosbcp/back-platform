import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {Company} from 'src/company/entities/company.entity';

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		 
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>
	) {}

	async create(createUserDto: CreateUserDto) {
		const user = this.userRepository.create(createUserDto);
		return await this.userRepository.save(user);
	}

	async findAll() {
		return await this.userRepository.find();
	}

	async findOne(id: number) {
		return await this.userRepository.findOneBy({id});
	}

	async update(id: number,updateUserDto: UpdateUserDto) {
		return await this.userRepository.update(id, updateUserDto);
	}

	async remove(id: number) {
		return await this.userRepository.softDelete({id});
	}
}
