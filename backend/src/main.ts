import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);


  await app.listen( process.env.PORT ?? 3000 , ()=>{

    console.log(`this app is starting on port ${process.env.PORT}`);
    
  });
}
bootstrap();
