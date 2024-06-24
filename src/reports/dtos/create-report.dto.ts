import { IsLatLong, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReportDto {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number;

    // Longitude
    @IsLongitude()
    lng: number;

    // Latitude
    @IsLatLong()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;
}