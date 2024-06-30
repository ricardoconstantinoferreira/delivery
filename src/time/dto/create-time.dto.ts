import { IsInt, IsString } from "class-validator";

export class CreateTimeDto {

    @IsInt()
    id: number;

    @IsString()
    description: string;

    @IsInt()
    price: number;

    @IsInt()
    store_id: number;

    @IsInt()
    week_id: number;
}