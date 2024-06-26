import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import {UsersService} from 'src/users/users.service';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {JwtService} from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import {CompanyService} from 'src/company/company.service';


@Injectable()
export class AuthService {

	constructor(
		private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
		private readonly companyService: CompanyService
	) {}


		async register({ name, email, password, company }: RegisterDto) {
			const user = await this.usersService.findOneByEmail(email);
	
			if (user) {
				throw new BadRequestException('User already exists');
			}

			let isCompany = await this.companyService.findByName(company);
			if (!isCompany) {
				isCompany = await this.companyService.create({ name: company });
			}
			await this.usersService.create({
				name,
				email,
				password: await bcryptjs.hash(password,10),
			
				company: company
			},
		);
	
			return {
				name,
				email,
	
			};
		}

	async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,   
      email,
    };
  }

	async profile({ email }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email);
  }

}
