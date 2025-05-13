import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [
    {
      id: 1,
      fullName: "Analog Head",
      joiningDate: "1965-04-14",
      yearsOfService: 59,
      position: "CEO",
      department: "Directors",
      projectName: "Direction",
      proficientSkill: "Management"
    }
  ];

  private employeeSubject = new BehaviorSubject<Employee[]>(this.employees);
  public refresh$ = new Subject<void>();
  private selectedEmployee: Employee | null = null;

  constructor() { }

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.employeeSubject.asObservable();
  }

  // Add new employee
  addEmployee(employee: Employee): void {
    const employeeList = this.employeeSubject.value;
    const newEmployee = { ...employee, id: this.generateId(employeeList)};
    this.employeeSubject.next([...employeeList, newEmployee]);
    this.refresh$.next();
  }

  // Update an existing employee
  updateEmployee(updatedEmployee: Employee): void {
    const updatedList = this.employeeSubject.value.map(emp =>
      emp.id === updatedEmployee.id ? { ...updatedEmployee} : emp
    );
    this.employeeSubject.next(updatedList);
    this.refresh$.next();
  }

  // Delete an employee
  deleteEmployee(id: number): void {
    const filteredList = this.employeeSubject.value.filter(emp => emp.id !== id);
    this.employeeSubject.next(filteredList);
    this.refresh$.next();
  }

  // Generate id for new employee
  private generateId(data: Employee[]): number {
    return data.length ? Math.max(...data.map(emp => emp.id)) + 1 : 1;
  }

  setSelectedEmployee(emp: Employee | null) {
    this.selectedEmployee = emp;
  }

  getSelectedEmployee(): Employee | null {
    return this.selectedEmployee;
  }
}
