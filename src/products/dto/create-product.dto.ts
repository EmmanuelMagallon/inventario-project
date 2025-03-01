import { v4 as uuid } from 'uuid';
import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateProductDto {
@IsUUID("4")
@IsOptional()
productid: string;
@IsString()
@MaxLength(40)
productName: string;
@IsNumber()
price: number;
@IsInt()
countseal: number;
@IsString()
@IsUUID()
provider: string;

}
