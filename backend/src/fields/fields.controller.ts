import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('fields')
@UseGuards(JwtAuthGuard)
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post('create')
  async create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldsService.create(createFieldDto);
  }

  @Get('getAll')
  async findAllFields() {
    return this.fieldsService.getAllFields();
  }

  @Get('getField/:id')
  async findOne(@Param('id') id: string) {
    return this.fieldsService.findFiledById(id);
  }

  @Patch('updateField/:id')
  async update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldsService.updateField(id, updateFieldDto);
  }

  @Delete('deleteField/:id')
  async remove(@Param('id') id: string) {
    return this.fieldsService.deleteField(id);
  }
}
