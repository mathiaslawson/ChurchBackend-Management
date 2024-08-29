import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport'; 
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Mystic')
    .setDescription('The Church Membership Management System Backend API Documentation')
    .setVersion('1.0.0')
    .build();
  
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);


  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(
    session({
      secret: process.env.SESSION_SECRETE, 
      resave: false, 
      saveUninitialized: false,
      cookie: {maxAge: 360000}
    })
  )

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT);
}
bootstrap();
