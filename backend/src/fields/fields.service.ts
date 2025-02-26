import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { FieldRepository } from './fields.repository';

@Injectable()
export class FieldsService {

  constructor(private readonly FieldRepository: FieldRepository ){}


  async create(createFieldDto: CreateFieldDto) {

   const newField =  await this.FieldRepository.create(createFieldDto);

   return newField
  }

  async getAllFields() {

    const fields = await this.FieldRepository.findAll()

    if(!fields || fields.length < 0){

      throw new NotFoundException('there is no fields')
      
    }

    return fields
  }

  async findFiledById(id: string) {

    const field = await this.FieldRepository.findById(id);

    if(!field){
      throw new NotFoundException('this field is not exist');
    }

    return field

  }

  async updateField(id: string, updateFieldDto: UpdateFieldDto) {

    return await this.FieldRepository.update(id , updateFieldDto);
  }

  async deleteField(id: string) {

    return await this.FieldRepository.delete(id)
  }
}
