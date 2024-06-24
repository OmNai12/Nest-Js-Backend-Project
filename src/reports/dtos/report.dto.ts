import { Expose, Transform } from "class-transformer";

export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    price: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    // Longitude
    @Expose()
    lng: number;

    // Latitude
    @Expose()
    lat: number;

    @Expose()
    mileage: number;

    @Expose()
    approved: boolean;

    // From orignal user entity take the value of ID and assign to the userId and tansform the flow
    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;
}