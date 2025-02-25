import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from 'uuid';

@Injectable()
export class EmployeesService {
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
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return this.employees;

  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.find(employee => employee.id === id) || null;
    if (!employee) throw new NotFoundException();
    return employee;
  }


  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeetoupdate = this.findOne(id)!;
    employeetoupdate = {

        ...employeetoupdate,
          ...updateEmployeeDto

    }
    if (!employeetoupdate) throw new NotFoundException();
    this.employees =this.employees.map((employee)=>{
    if (employee.id == id) {
      employee = employeetoupdate
    }
    return employee}
    )
    return employeetoupdate;
  }

  remove(id: string) {

   this.findOne(id)
    this.employees.filter(employee => employee.id !== id);
    return this.employees;

  }
}
