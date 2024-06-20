import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  // forRoot means for entire object
  imports: [TypeOrmModule.forRoot({
  //   Configuration object
    type:'sqlite',
    database:'db.sqlite',
    entities:[User, Report],
    synchronize:true
  }) ,UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
