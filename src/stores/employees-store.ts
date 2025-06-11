import {
    signalStore,
    withState,
    withMethods,
    withComputed,
    patchState,
  } from '@ngrx/signals';
  import { inject, computed } from '@angular/core';
  
  import { EmployeeService } from '../services/employee-serivce';
  import { Employee } from '../models/employee';
  
  interface EmployeesState {
    employees: Employee[];
    isLoading: boolean;
    error: string | null;
  }
  
  const initialState: EmployeesState = {
    employees: [],
    isLoading: false,
    error: null,
  };

  export const EmployeesStore = signalStore(
    withState(initialState),
    withMethods((store) => {
      const employeeService = inject(EmployeeService);
  
      return {
        loadEmployees() {
          patchState(store, { isLoading: true, error: null });
  
          employeeService.getEmployees().subscribe({
            next: (employees) =>
              patchState(store, { employees, isLoading: false }),
            error: (err) =>
              patchState(store, {
                error: err?.message ?? 'Unknown error',
                isLoading: false,
              }),
          });
        },
  
        updateEmployee(employee: Employee) {
          patchState(store, { isLoading: true, error: null });
          employeeService.updateEmployee(employee).subscribe({
            next: (updated) =>
              patchState(store, {
                employees: store.employees().map((e) =>
                  e.id === updated.id ? updated : e
                ),
                isLoading: false,
              }),
            error: (err) =>
              patchState(store, {
                error: err?.message ?? 'Unknown error',
                isLoading: false,
              }),
          });
        },
      };
    }),
  
    withComputed((store) => ({
      employees: computed(() => store.employees()),
      departments: computed(() =>
        [...new Set(store.employees().map((e) => e.department))].sort()
      ),
  
      cities: computed(() =>
        [...new Set(store.employees().map((e) => e.city))].sort()
      ),
      isLoading: computed(() => store.isLoading()),
      error: computed(() => store.error()),
    }))


  );
  
  
  