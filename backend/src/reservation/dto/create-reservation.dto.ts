import { IsString, IsNotEmpty, IsOptional, IsEnum, IsMongoId, IsNumber, IsDate } from 'class-validator';

export class CreateReservationDto {

    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @IsOptional()
    @IsMongoId()
    teamId?: string;

    @IsNotEmpty()
    @IsMongoId()
    fieldId: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsString()
    startTime: string;

}

