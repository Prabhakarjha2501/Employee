import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../commonservice/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  employeeForm = {
    name: '',
    salary: '',
    age: ''
  };
  editingEmployee: any = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.debounceRequest(() => {
      this.employeeService.getEmployees().subscribe(data => {
        this.employees = data.data;
      });
    });
  }

  getEmployeeById(id: number) {
    this.employeeService.debounceRequest(() => {
      this.employeeService.getEmployeeById(id).subscribe(data => {
        this.editingEmployee = data.data;
        this.employeeForm = {
          name: this.editingEmployee.employee_name,
          salary: this.editingEmployee.employee_salary,
          age: this.editingEmployee.employee_age
        };
      });
    });
  }

  createEmployee() {
    this.employeeService.debounceRequest(() => {
      this.employeeService.createEmployee(this.employeeForm).subscribe(data => {
        this.getEmployees();
      });
    });
  }

  updateEmployee() {
    this.employeeService.debounceRequest(() => {
      this.employeeService.updateEmployee(this.editingEmployee.id, this.employeeForm).subscribe(data => {
        this.getEmployees();
        this.editingEmployee = null;
      });
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.debounceRequest(() => {
      this.employeeService.deleteEmployee(id).subscribe(data => {
        this.getEmployees();
      });
    });
  }

  editEmployee(id: number) {
    this.getEmployeeById(id);
  }

  clearForm() {
    this.employeeForm = {
      name: '',
      salary: '',
      age: ''
    };
    this.editingEmployee = null;
  }
}



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employee',
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css']
// })
// export class EmployeeComponent {

// }
