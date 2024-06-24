import { IsInt, IsString } from "class-validator";

export class CreateStoreDto {

    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    postcode: string;

    @IsString()
    state: string;
}
