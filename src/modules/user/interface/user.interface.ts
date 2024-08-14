export interface ICreateUser {
    email: string;
    phoneNumber: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}


export enum Gender {
    FEMALE = 'Female',
    MALE = 'Male',
}


export enum Constants{
    EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD'
}