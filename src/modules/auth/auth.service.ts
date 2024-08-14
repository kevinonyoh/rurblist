/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
    ) {}

  async login(data: LoginDto) {
    const {email} = data;
       
       const user = await this.userService.getUserByEmail(email);

       if(!user) throw new UnauthorizedException("This user does not exist");

      const val = bcrypt.compareSync(data?.password, user.password);

      if(!val) throw new UnauthorizedException("Incorrect password");

      const secret = this.configService.get<string>('secretKey');

      const accessToken = await this.jwtService.signAsync({ id: user.id, email },{secret});
      
     const {password, ...rest} = user.toJSON();
     
      return { ...rest, accessToken }
  }
}
