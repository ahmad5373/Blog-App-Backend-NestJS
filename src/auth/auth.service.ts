import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { hash ,compare } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UserService,
    ) { }

    async register(registerDto:RegisterDto) {
        const { username, email, password } = registerDto;
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new ConflictException('user already exist with provided email create new user');
        }
        const hashedPassword = await hash(password, 10);
        const newUser = await this.usersService.create({ username, email, password:hashedPassword });
        return this.generateToken(newUser);
    }

    async login(loginDto: LoginDto) {
        const {email , password} = loginDto;
        const user = await this.usersService.findOneByEmail(email);
        if (!user || !(await compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.generateToken(user);
    }

    private generateToken(user: any) {
        const payload = { email: user.email, id: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
}
