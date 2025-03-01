import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()

export class Employee {
  @PrimaryGeneratedColumn('uuid')
  employeeid: string;
  @Column('text')
  name: string;
  @Column('text')
  lastname: string;
  @Column('text')
  phone:number
  @Column('text')
  email: string;
}
