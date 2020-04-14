import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import passport from 'passport';
import session from 'express-session';
import FileStoreFactory from 'session-file-store';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: 'secret',
      name: 'session',
      resave: false,
      saveUninitialized: false,
      unset: 'destroy',
      store: new (FileStoreFactory(session))(),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const options = new DocumentBuilder()
    .setTitle('Meetups API')
    .addSecurity('cookie-session', {
      type: 'apiKey',
      in: 'cookie',
      name: 'connected',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
