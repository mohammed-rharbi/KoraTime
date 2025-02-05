import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'], 
  });

  await app.listen( process.env.PORT ?? 3003 , ()=>{

    console.log(`this app is starting on port ${process.env.PORT}`);
    
  });
}
bootstrap();
