import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './model/user.model';
import { CacheStoreModule } from 'src/shared/cache-store/cache-store.module';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), CacheStoreModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
