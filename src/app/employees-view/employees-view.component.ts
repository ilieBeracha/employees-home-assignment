import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { EmployeesStore } from '../../stores/employees-store';
import { Employee } from '../../models/employee';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees-view',
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './employees-view.component.html',
  styleUrl: './employees-view.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class EmployeesViewComponent {
  readonly employeesStore = inject(EmployeesStore);
  dialog = inject(MatDialog);

  selectedCity: string = '';
  selectedDepartment: string = '';
  searchText: string = '';

  constructor() {
    this.employeesStore.loadEmployees();
    const currentFilter = this.employeesStore.currentFilter();
    this.selectedCity = currentFilter.city || '';
    this.selectedDepartment = currentFilter.department || '';
    this.searchText = currentFilter.searchText || '';
  }
  
  get isLoading() {
    return this.employeesStore.isLoading();
  }

  get employees() {
    return this.employeesStore.filteredEmployees();
  }

  get departments() {
    return this.employeesStore.departments();
  }
  get cities() {
    return this.employeesStore.cities();
  }

  get currentFilter() {
    return this.employeesStore.currentFilter();
  }

  get currentPage() {
    return this.employeesStore.currentPage();
  }

  get pageSize() {
    return this.employeesStore.pageSize();
  }

  get totalItems() {
    return this.employeesStore.totalItems();
  }

  get totalPages() { 
    return this.employeesStore.totalPages();
  }

  get hasPreviousPage() {
    return this.employeesStore.hasPreviousPage();
  }

  get hasNextPage() {
    return this.employeesStore.hasNextPage();
  }

  onCityChange(event: Event) {
    const city = (event.target as HTMLSelectElement).value || null;
    this.employeesStore.setFilter({ city });
  }

  onDepartmentChange(event: Event) {
    const department = (event.target as HTMLSelectElement).value || null;
    this.employeesStore.setFilter({ department });
  }

  onSearchTextChange(event: Event) {
    const searchText = (event.target as HTMLInputElement).value || null;
    this.employeesStore.setFilter({ searchText });
  }

  clearAllFilters() {
    this.selectedCity = '';
    this.selectedDepartment = '';
    this.searchText = '';
    this.employeesStore.clearFilter();
  }

  goToPage(page: number) {
    this.employeesStore.goToPage(page);
  }

  onPageSizeChange(event: Event) {
    const newSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.employeesStore.setPageSize(newSize);
  }

  openEditEmployeeDialog(employee: Employee) {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      data: employee
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeesStore.updateEmployee(result);
      }
    });
  }

}
