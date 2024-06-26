import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { dataSourceOptions } from 'db/data-source';
const cookieSession = require('cookie-session');


@Module({
  // forRoot means for entire object
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // ! Old Implementation :-
    // TypeOrmModule.forRoot({
    // * // Configuration object
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true
    // }),
    // ! Old implementation :-
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       synchronize: true,
    //       entities: [User, Report]
    //     }
    //   }
    // }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService,
    {
      // Moved from main.ts to here applied to every incoming request
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }
  ],
})
export class AppModule {

  constructor(private configService: ConfigService) { }

  /**
   * 
   * @param consumer 
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        // Keys is used to encrypt the string
        keys: [this.configService.get('COOKIE_KEY')],
      }),
    ).forRoutes('*');
    // forRoutes :- each routes of our app
  }
}
