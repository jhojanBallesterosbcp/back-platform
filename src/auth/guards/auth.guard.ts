import {CanActivate,ExecutionContext,Injectable,UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {JwtPayload} from '../interfaces/jwt-payload';
import {AuthService} from '../auth.service';
import {Request} from 'express';
import {UsersService} from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private jwtServise: JwtService,
		private authService: AuthService,
		private userService: UsersService
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {

		const request=context.switchToHttp().getRequest();

		const token=this.extraxtTokenFromHeader(request)


		if(!token) {
			throw new UnauthorizedException('Invalid token');
		}

		try {
			const payload=await this.jwtServise.verifyAsync<JwtPayload>(token,{secret: process.env.JWT_SEED}
			);

			const user = await this.userService.findUserById(payload.id);
			if(!user) throw new UnauthorizedException('User does not exist');  
/*			if(!user.isActive) throw new UnauthorizedException('User is not active');*/
			
			request['user']=user

		} catch(error) {
			throw new UnauthorizedException();

		}
		return true;
	}

	private extraxtTokenFromHeader(request: Request): string|undefined {
		const [type,token]=request.headers['authorization']?.split(' ')??[];
		return type==='Bearer'? token:undefined;
	}
}
