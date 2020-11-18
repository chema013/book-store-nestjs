import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from '../user/user.entity';
import { IJwtPayload } from './jwt.payload.interface';
import { compare } from 'bcryptjs';
import { RoleType } from '../role/roletype.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ) { }

    async signup(signupDto: SignupDto): Promise<void> {
        const { username, email } = signupDto;
        const userExist = await this._authRepository.findOne({
            where: [{ username} , { email }],
        });

        if (userExist) {
            throw new ConflictException("user or email alredy exists");
        }

        return this._authRepository.signup(signupDto);
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }> {
        const { username, password } = signinDto;

        const user: User = await this._authRepository.findOne({
            where: { username },
        });

        if (!user) {
            throw new NotFoundException('User does not exist');
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles.map(r => r.name as RoleType)
        }

        const token = await this._jwtService.sign(payload);

        return { token };
    }
}