import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { employeesStore } from '../../stores/employees-store';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employees-view',
  imports: [CommonModule, NgFor],
  providers: [employeesStore],
  templateUrl: './employees-view.component.html',
  styleUrl: './employees-view.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class EmployeesViewComponent {
  employeesStore = inject(employeesStore);

  constructor() {
    this.employeesStore.loadEmployees();
  }
  employees = this.employeesStore.employees();
  departments = this.employeesStore.departments();

  updateEmployee(employee: Employee) {
    console.log(employee);
  }
}
