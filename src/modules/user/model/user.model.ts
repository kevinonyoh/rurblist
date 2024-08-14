/* eslint-disable prettier/prettier */
import { AllowNull, Column, DataType, Default, HasMany, IsEmail, IsUrl, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Gender } from '../interface/user.interface';


@Table({
    tableName: 'user',
    modelName: 'UserModel',
    underscored: true,
    freezeTableName: true
})
export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @IsEmail
    @Unique
    @AllowNull(false)
    @Column
    email: string;

    @Unique
    @AllowNull(false)
    @Column
    username: string;

    @AllowNull(false)
    @Column
    firstName: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(false)
    @Column
    phoneNumber: string;

    @Column
    password: string;

    @Column(DataType.ENUM(Gender.MALE, Gender.FEMALE))
    gender: Gender;

    @IsUrl
    @Column
    profilePicture: string;

    @Column(DataType.DATEONLY)
    dateOfBirth: string;

    @Default(false)
    @Column
    emailVerified: boolean;
    
    @Default(false)
    @Column
    activated: boolean;

    @Column
    address: string;

    @Column
    occupation: string

}
