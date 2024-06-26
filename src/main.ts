import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// ! Old Implementation :- import { ValidationPipe } from '@nestjs/common';
// Not works nicely with the import way so we use the older way to import
// ! Old Implementation :- const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ! Old Implementation :-

  // app.use(
  //   cookieSession({
  //     // Keys is used to encrypt the string
  //     keys: ['asdfasdf'],
  //   }),
  // );
  // ! Old Implementation :-
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true
  //   })
  // )
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
