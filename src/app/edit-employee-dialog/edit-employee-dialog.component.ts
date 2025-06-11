import { Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { employeesStore } from '../../stores/employees-store';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeesViewComponent } from '../employees-view/employees-view.component';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-edit-employee-dialog',
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule],
  providers: [employeesStore  ],
  templateUrl: './edit-employee-dialog.component.html',
  standalone: true,
  styleUrl: './edit-employee-dialog.component.scss'
})
export class EditEmployeeDialogComponent {
  readonly employeesStore = inject(employeesStore);
  constructor(public dialogRef: MatDialogRef<EmployeesViewComponent>, @Inject(MAT_DIALOG_DATA) public data: Employee)  { 
    this.employeesStore.loadEmployees();
  }
  @Output() PostEditeEmployeeResponse = new EventEmitter<Employee>()

  saveEmployee() {
    this.PostEditeEmployeeResponse.emit(this.data);
    this.dialogRef.close(this.data);
  }
  employees = this.employeesStore.employees();
  departments = this.employeesStore.departments(); 
  cities = this.employeesStore.cities();

  closeDialog() {
    this.dialogRef.close();
  }

} `      `
