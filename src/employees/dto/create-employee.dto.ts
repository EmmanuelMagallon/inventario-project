import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateEmployeeDto {
 id: number;
  @IsString()
 @MaxLength(30)
  name: string;
 @IsString()
 @MaxLength(70)
  lastname: string;
 @IsString()
 @MaxLength(10)
  phonenumber: string;
 @IsString()
  @IsEmail()
  email: string;

}
