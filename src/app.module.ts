import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appProvider } from './common/app.provider';
import { ConfigsModule } from './common/configs/configs.module';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './shared/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [ConfigsModule, DatabaseModule, JwtModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ...appProvider],
})
export class AppModule {}