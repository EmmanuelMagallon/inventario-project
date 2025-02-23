import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  private readonly employees = [
    {
      id: 1,
      name: "Lalo",
      lastname: "elescualo",
      phonenumber: "241544"
    },
    {
      id: 2,
      name: "Philipo",
      lastname: "Esphenicidae",
      phonenumber: "1313134"
    }
  ];
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1;
    this.employees.push(createEmployeeDto);
    return this.employees;

  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.find(employee => employee.id === id) || null;
    return employee;
  }


  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employeetoupdate = this.findOne(id)!;
    employeetoupdate = {

        ...employeetoupdate,
          ...updateEmployeeDto

    }
    this.employees=this.employees.map((employee)=>{
    if (employee.id == id) {
      employee = employeetoupdate
    }
    return employee}
    )
    return employeetoupdate;
  }

  remove(id: number) {
    return this.employees.filter(employee => employee.id !== id);
  }
}
