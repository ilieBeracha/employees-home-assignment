import { Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { employeesStore } from '../../stores/employees-store';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-employee-dialog',
  imports: [NgFor, MatDialogModule],
  providers: [employeesStore],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrl: './edit-employee-dialog.component.scss'
})
export class EditEmployeeDialogComponent {

  employeesStore = inject(employeesStore);
  @Output() newEmployee = new EventEmitter<Employee>();

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employeesStore.loadEmployees();

  }

  departments = this.employeesStore.departments();
  cities = this.employeesStore.cities();

  closeDialog() {
    this.dialogRef.close();
  }

  saveEmployee() {
    this.newEmployee.emit(this.data);
    this.dialogRef.close(this.data);
  }

  onSubmit() {
    this.newEmployee.emit(this.data);
    this.dialogRef.close(this.data);
  }
} `      `
