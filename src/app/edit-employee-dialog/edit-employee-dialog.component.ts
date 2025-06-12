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
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-employee-dialog',
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrl: './edit-employee-dialog.component.scss',
  standalone: true,
})
export class EditEmployeeDialogComponent {
  readonly employeesStore = inject(EmployeesStore);
  constructor(public dialogRef: MatDialogRef<EditEmployeeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Employee)  { 
  }
  @Output() PostEditeEmployeeResponse = new EventEmitter<Employee>();

  saveEmployee() {
    this.employeesStore.updateEmployee(this.data);
    this.PostEditeEmployeeResponse.emit(this.data);
    this.closeDialog();
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
