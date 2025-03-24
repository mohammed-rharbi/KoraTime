import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { FieldRepository } from './fields.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class FieldsService {

  constructor(private readonly FieldRepository: FieldRepository ){}


  async create(createFieldDto: CreateFieldDto) {

    const availability = this.generateWeeklyAvailability();
  

    const newField = await this.FieldRepository.create({
      ...createFieldDto,
      availability
    });
  
    return newField;
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
  

  private generateWeeklyAvailability() {
    const availability = [];
    const today = new Date();
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];
  
      const slots = [];
      for (let hour = 8; hour < 20; hour++) {
        slots.push({
          startTime: `${hour}:00`,
          endTime: `${hour + 1}:00`,
          isBooked: false
        });
      }
  
      availability.push({ date: formattedDate, slots });
    }
  
    return availability;
  }

  // @Cron(CronExpression.EVERY_HOUR)
  // async handleExpiredSlots() {
  //     console.log('Checking and updating expired slots...');
  //     await this.FieldRepository.checkAndUpdateExpiredSlots()
  // }
  
}
