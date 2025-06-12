import { Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeesStore } from '../../stores/employees-store';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-employee-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrl: './edit-employee-dialog.component.scss',
  standalone: true,
})
export class EditEmployeeDialogComponent {
  employeeData: Employee
  errorMessage: string | null = null;

  readonly employeesStore = inject(EmployeesStore);

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.errorMessage = null;
    this.employeeData = {...data}
  }

  async saveEmployee(form: NgForm) {
    this.errorMessage = null;

    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const isValid = await this.validateAndPrepareEmployee(this.data);
    if (!isValid) {
      return;
    }
    this.dialogRef.close(this.employeeData);
  }

  async validateAndPrepareEmployee(employee: Employee): Promise<boolean> {
    this.errorMessage = null; 
    if (
      !employee.firstName || employee.firstName.trim() === '' ||
      !employee.lastName || employee.lastName.trim() === '' ||
      !employee.department || employee.department.trim() === '' ||
      !employee.city || employee.city.trim() === ''
    ) {
      this.errorMessage = 'All fields (First Name, Last Name, Department, City) must be filled.';
      return false;
    }

    return true;
  }

  get employees() {
    return this.employeesStore.employees();
  }
  get departments() {
    return this.employeesStore.departments();
  }
  get cities() {
    return this.employeesStore.cities();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
