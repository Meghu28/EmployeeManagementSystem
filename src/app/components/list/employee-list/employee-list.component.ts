import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.employeeService.refresh$.subscribe(() => {
      this.loadEmployees();
    });
  }

  goToList() {
    this.router.navigate(['/list']);
  }

  goToForm() {
    this.employeeService.setSelectedEmployee(null);
    this.router.navigate(['/form']);
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    })
  }

  onEdit(employee: Employee) {
    this.employeeService.setSelectedEmployee(employee);
    this.router.navigate(['/form']);
  }

  onDelete(id: number) {
    this.employeeService.deleteEmployee(id);
  }

  onAdd() {
    this.employeeService.setSelectedEmployee(null);
    this.router.navigate(['/form']);
  }
}
