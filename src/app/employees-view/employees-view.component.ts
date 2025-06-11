import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { EmployeesStore } from '../../stores/employees-store';
import { Employee } from '../../models/employee';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-employees-view',
  imports: [CommonModule, NgFor],
  providers: [EmployeesStore],
  templateUrl: './employees-view.component.html',
  styleUrl: './employees-view.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class EmployeesViewComponent {
  readonly employeesStore = inject(EmployeesStore);
  dialog = inject(MatDialog);
  
  constructor() {
    this.employeesStore.loadEmployees();
  }
  
  employees = this.employeesStore.employees();
  departments = this.employeesStore.departments();
  cities = this.employeesStore.cities();

  openEditEmployeeDialog(employee: Employee) {
    this.dialog.open(EditEmployeeDialogComponent, {
      data: employee,
    });
  }
}
