import { IsString,  IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum, ValidateNested, IsArray, IsMongoId, IsObject } from 'class-validator';
import { Type , Transform } from 'class-transformer';



export class CreateFieldDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    location: string;


    @IsNotEmpty()
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    photo?: string;

    @IsOptional()
    @IsMongoId()
    fieldManager?: string;

    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value))
    price: string;

    @IsEnum(['5v5', '7v7', '11v11'])
    size: '5v5' | '7v7' | '11v11';

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    lightsAvailable?: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    isAvailable?: boolean;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RatingDto)
    @IsArray()
    ratings?: RatingDto[];

    @IsString()
    @IsEnum(['available', 'closed', 'under maintenance'])
    status: 'available' | 'closed' | 'under maintenance';


    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AvailabilityDTO)
    @IsArray()
    availability?: AvailabilityDTO[];




}

export class RatingDto {
    @IsMongoId()
    userId: string;

    @IsNumber()
    rating: number;

    @IsOptional()
    @IsString()
    comment?: string;
}


export class LocationDto {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;
}


class SlotDTO {
    @IsString()
    @IsNotEmpty()
    startTime: string;  

    @IsString()
    @IsNotEmpty()
    endTime: string; 
  
    @IsBoolean()
    isBooked: boolean;
  }


  export class AvailabilityDTO {
    @IsString()
    date: string;  
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SlotDTO)
    slots: SlotDTO[];
  }
