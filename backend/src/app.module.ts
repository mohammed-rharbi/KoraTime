import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [AuthModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
