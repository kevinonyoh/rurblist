import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfirmEmailDto, CreateUserDto, ForgotPasswordEmailDto, ResetPasswordEmailDto, VerifyDto, VerifyForgotPasswordOtpDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Public()
  @Post('register')
  @ResponseMessage('Otp for email verification has been sent to your email')
  async create(@Body() body: CreateUserDto, @TransactionParam() transaction: Transaction) {
    return this.userService.create(body, transaction);
  }

  @Public()
  @Post('verify')
  @HttpCode(200)
  @ResponseMessage('Email verified successfully. Proceed to log in')
  async verify(@Body() body: VerifyDto, @TransactionParam() transaction: Transaction) {
    return this.userService.verifyEmail(body, transaction);
  }

  @Public()
  @Post('confirm-email')
  @HttpCode(200)
  @ResponseMessage('Email verified and account activated successfully. Proceed to log in')
  async confirmEmail(@Body() body: ConfirmEmailDto, @TransactionParam() transaction: Transaction) {
    return this.userService.confirmEmail(body, transaction);
  }

  @Public()
  @Post('forgot-password-email')
  @HttpCode(200)
  @ResponseMessage('Kindly check your email for your otp')
  async forgotPasswordEmail(@Body() body: ForgotPasswordEmailDto) {
    return this.userService.forgotPasswordEmail(body);
  }
 
  @Public()
  @Post('verify-forgot-password-otp')
  @HttpCode(200)
  @ResponseMessage('Password change successful')
  async verifyForgotPasswordOtp(@Body() body: VerifyForgotPasswordOtpDto, @TransactionParam() transaction: Transaction) {
    return this.userService.verifyForgotPasswordOtp(body, transaction);
  }

  
  @Post('reset-password-email')
  @HttpCode(200)
  @ResponseMessage('Password reset successful. Proceed to login')
  async resetPasswordEmail(@Body() body: ResetPasswordEmailDto, @TransactionParam() transaction: Transaction) {
    return this.userService.resetPasswordEmail(body, transaction);
  }

  
  @Get('email/:email')
  @ResponseMessage('User data')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

}
