import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  productid: string;
  @Column({type: 'text'})
  productName: string;
  @Column({type: 'float'})
  price: number;
  @Column({type: 'int'})
  countseal: number;
  @Column({type: 'uuid'})
  @IsNumber()
  provider: string;
}
