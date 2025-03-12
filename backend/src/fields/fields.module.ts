import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from './entities/field.entity';
import { FieldRepository } from './fields.repository';

@Module({
  imports:[ MongooseModule.forFeature([{name:Field.name , schema:FieldSchema}])],
  controllers: [FieldsController],
  providers: [FieldsService , FieldRepository],
  exports: [FieldsService , FieldRepository]
})
export class FieldsModule {}
