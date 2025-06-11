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
import { EmployeesViewComponent } from '../employees-view/employees-view.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-employee-dialog',
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule],
  providers: [EmployeesStore  ],
  templateUrl: './edit-employee-dialog.component.html',
  standalone: true,
  styleUrl: './edit-employee-dialog.component.scss'
})
export class EditEmployeeDialogComponent {
  readonly employeesStore = inject(EmployeesStore);
  constructor(public dialogRef: MatDialogRef<EmployeesViewComponent>, @Inject(MAT_DIALOG_DATA) public data: Employee)  { 
    this.employeesStore.loadEmployees();
  }
  @Output() PostEditeEmployeeResponse = new EventEmitter<Employee>()

  saveEmployee() {
    this.employeesStore.updateEmployee(this.data);
    this.employeesStore.loadEmployees();
    this.dialogRef.close();
  }
  employees = this.employeesStore.employees();
  departments = this.employeesStore.departments(); 
  cities = this.employeesStore.cities();

  closeDialog() {
    this.dialogRef.close();
  }
} `      `
