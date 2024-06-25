import { IsInt, IsString } from "class-validator";

export class CreateWeekDto {

    @IsInt()
    id: number;

    @IsString()
    days: string;

    @IsInt()
    store_id: number;
}
