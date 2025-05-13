import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  @Input() editEmployee: Employee | null = null;

  employeeForm!: FormGroup;
  positions = ['CEO', 'Software Engineer', 'Manager', 'Recruiter'];
  departments = ['Development', 'QA', 'HR', 'Marketing', 'IT Service', 'Directors'];
  skills = ['Angular', 'React', 'Vue', 'Node.js', 'Management', 'Java', '.Net'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editEmployee = this.employeeService.getSelectedEmployee();

    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      joiningDate: ['', Validators.required],
      yearsOfService: [0, [Validators.required, Validators.min(0)]],
      position: ['', Validators.required],
      department: ['', Validators.required],
      projectName: ['', Validators.required],
      proficientSkill: ['', Validators.required],
    });

    if (this.editEmployee) {
      const formattedDate = this.editEmployee.joiningDate;
      this.employeeForm.patchValue({
        ...this.editEmployee,
        joiningDate: formattedDate
      });
    }
  }

  goToList() {
    this.router.navigate(['/list']);
  }

  goToForm() {
    this.router.navigate(['/form']);
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) return;

    const formValue = this.employeeForm.value;
    
    const action = this.editEmployee ? 'update' : 'add';
    const confirmMsg = `Are you sure you want to ${action} this employee?`;
    if (!window.confirm(confirmMsg)) return;

    if (this.editEmployee) {
      const updatedEmployee: Employee = {
        ...formValue,
        id: this.editEmployee.id,
      };
      this.employeeService.updateEmployee(updatedEmployee);
    } else {
      const newEmployee: Employee = {
        ...formValue,
        id: 0,
      };
      this.employeeService.addEmployee(newEmployee);
    }

    this.employeeForm.reset();
    this.router.navigate(['/list']);
  }
}
