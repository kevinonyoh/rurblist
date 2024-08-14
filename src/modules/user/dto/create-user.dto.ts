import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    phoneNumber: string;
 
    @IsString()
    @IsNotEmpty()
    firstName: string;
 
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    username: string;
 
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class VerifyDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class ConfirmEmailDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(6)
    otp: string;
}

export class ForgotPasswordEmailDto {    
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class VerifyForgotPasswordOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    otp: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;
}

export class ResetPasswordEmailDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;
}

