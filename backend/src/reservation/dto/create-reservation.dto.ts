import { IsString, IsNotEmpty, IsOptional, IsEnum, IsMongoId, IsNumber, IsDate } from 'class-validator';

export class CreateReservationDto {
    @IsOptional()
    @IsMongoId()
    userId?: string;

    @IsOptional()
    @IsMongoId()
    teamId?: string;

    @IsNotEmpty()
    @IsMongoId()
    fieldId: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsEnum(['confirmed', 'pending', 'canceled', 'completed'])
    status: 'confirmed' | 'pending' | 'canceled' | 'completed';

    @IsOptional()
    @IsString()
    cancellationReason?: string;
}

