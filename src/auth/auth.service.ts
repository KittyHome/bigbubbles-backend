import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';
import { SigninDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(userDto: RegisterDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateTokens(user);
  }

  async signIn(userDto: SigninDto): Promise<any> {
    const user = await this.usersService.findByEmail(userDto.email);
    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      return this.generateTokens(user);
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  private generateTokens(user: User): any {
    const payload = { username: user.username, sub: user.id };
    const refreshTokenExpiresIn = this.configService.get<string>(
      'REFRESH_TOKEN_EXPIRES_IN',
      '7d',
    );
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: refreshTokenExpiresIn,
      }),
    };
  }
}
