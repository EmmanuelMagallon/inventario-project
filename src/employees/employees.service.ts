import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(@InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>) {}

  private employees = [
    {
      id: uuid(),
      name: "Lalo",
      lastname: "elescualo",
      phonenumber: "241544"
    },
    {
      id: uuid(),
      name: "Philipo",
      lastname: "Esphenicidae",
      phonenumber: "1313134"
    }
  ];
 async create(createEmployeeDto: CreateEmployeeDto) {
   const employee = await this.employeeRepository.save(createEmployeeDto);
   return employee;

  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: string) {
   const employee = this.employeeRepository.findOneBy(
     {
       employeeid: id
     }
   )
  }


  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeid: id,
      ...updateEmployeeDto
    });

    if (!employeeToUpdate) {
      throw new NotFoundException();
    }

    return await this.employeeRepository.save(employeeToUpdate); 
  }


  remove(id: string) {
this.employeeRepository.delete({
  employeeid: id
})
return{
  message: `Employee removed successfully.`,
}
  }
}
