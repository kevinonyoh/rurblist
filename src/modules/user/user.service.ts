import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfirmEmailDto, CreateUserDto, ForgotPasswordEmailDto, ResetPasswordEmailDto, VerifyDto, VerifyForgotPasswordOtpDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Transaction } from 'sequelize';
import { Constants, ICreateUser } from './interface/user.interface';
import * as bcrypt from "bcrypt";
import { UserRepository } from './repository/user.repository';
import { CacheStoreService } from 'src/shared/cache-store/cache-store.service';
import * as helpers from 'src/common/utils/helper';

@Injectable()
export class UserService {
   
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheStoreService: CacheStoreService
  ){}


  async create(data: CreateUserDto, transaction: Transaction) {
    const { email, password, username } = data;

    
    const userExist = await this.userRepository.findOne({ email });

    if (userExist) throw new BadRequestException("Email already exists");
    
    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);


    const payload: ICreateUser = {
      ...data,
      password: hashPassword
    };
    
    const user = await this.userRepository.create(payload, transaction);

    const { password: userPassword, ...rest } = user.toJSON();

    return rest;
  }


  async verifyEmail(data: VerifyDto, transaction: Transaction) {
    const { email } = data;

    const user = await this.getUserByEmail(email);

    if (!user) throw new BadRequestException('User not found');

    if (user.emailVerified) throw new BadRequestException("user's email already verified");

    const otp = await this.sendOtpEmail(email, Constants.EMAIL_VERIFICATION);

    return {
      email,
      otp
    };
  }

  async confirmEmail(data: ConfirmEmailDto, transaction: Transaction) {
    
    const { email, otp } = data;

    const user = await this.validateUser(email);

    if (user.emailVerified) throw new BadRequestException("User's email already verified");

    const userEmail = await this.cacheStoreService.get(otp, Constants.EMAIL_VERIFICATION);
    
    if (userEmail !== email) throw new BadRequestException('Invalid otp');

    await this.userRepository.update({ email }, {email, emailVerified: true, activated: true}, transaction);

    await this.cacheStoreService.del(otp, Constants.EMAIL_VERIFICATION);

  }

  async forgotPasswordEmail(data: ForgotPasswordEmailDto) {
    const { email } = data;

    await this.validateUser(email);
    
    const otp = await this.sendOtpEmail(email, Constants.FORGOT_PASSWORD);

    return { 
      email,
      otp
    };
  }

  async verifyForgotPasswordOtp(data: VerifyForgotPasswordOtpDto, transaction: Transaction) {
    const { email, otp, newPassword } = data;

    await this.validateUser(email);

    const userEmail = await this.cacheStoreService.get(otp, Constants.FORGOT_PASSWORD);
    
    if (userEmail !== email) throw new BadRequestException('Invalid otp');

    const salt = await bcrypt.genSalt();

    const hashPassword = bcrypt.hashSync(newPassword, salt);

    await this.userRepository.update({ email }, {password: hashPassword}, transaction);
  }


  async resetPasswordEmail(data: ResetPasswordEmailDto, transaction: Transaction) {
    const { email, password, newPassword } = data;

    await this.validateUser(email);

    const user = await this.getUserByEmail(email);

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) throw new BadRequestException('Password is incorrect');

    const salt = await bcrypt.genSalt();

    const hashPassword = bcrypt.hashSync(newPassword, salt);

    await this.userRepository.update({ email }, {password: hashPassword}, transaction);   
  }



  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }


  private async validateUser(email: string) {
    const user = await this.userRepository.findOne({ "email": email });

    if (!user) throw new BadRequestException('User not found');

    return user;
  }
  

  private async sendOtpEmail(email: string, type: string){
    const code = helpers.generateOtp();

    const ttl = helpers.convertTimeToMilliseconds(24, 'hours');

    await this.cacheStoreService.set(code, email, ttl, type);

    return code;

    // const content = {
    // [Constants.EMAIL_VERIFICATION]: {
    //     subject: 'Verification Code',
    //     body: `Use this verification code <b>${code}</b> to verify your email` 
    //   },
    //   [Constants.FORGOT_PASSWORD]: {
    //     subject: 'Forgot Password Code',
    //     body: `Use this OTP code <b>${code}</b> for your forgot password`
    //   }
    // };

    // const payloadContent = content[type] || {};

    // const payload = {
    //   recepient: email,
    //   ...payloadContent
    // };

    // this.httpRequestService.send({
    //   url: '/api/v1/mail',
    //   method: 'post',
    //   data: payload
    // });
  }
}

