import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum, ValidateNested, IsArray, IsMongoId, IsObject } from 'class-validator';
import { Type } from 'class-transformer';



export class CreateFieldDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    photo?: string;

    @IsOptional()
    @IsMongoId()
    fieldManager?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsEnum(['5v5', '7v7', '11v11'])
    size: '5v5' | '7v7' | '11v11';

    @IsOptional()
    @IsBoolean()
    lightsAvailable?: boolean;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RatingDto)
    @IsArray()
    ratings?: RatingDto[];

    @IsEnum(['available', 'closed', 'under maintenance'])
    status: 'available' | 'closed' | 'under maintenance';


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



