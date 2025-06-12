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

interface EmployeeFilter {
  city: string | null;
  department: string | null;
  searchText: string | null; // For firstName + lastName
}

interface EmployeesState {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  filter: EmployeeFilter; // Add filter to the state
}

const initialState: EmployeesState = {
  employees: [],
  isLoading: false,
  error: null,
  filter: {
    city: null,
    department: null,
    searchText: null, // For firstName + lastName
  },
};
export const EmployeesStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    const employeeService = inject(EmployeeService);
    return {
      loadEmployees() {
        patchState(store, { isLoading: true, error: null });

        employeeService.getEmployees().then(
          (employees) => patchState(store, { employees, isLoading: false }),
          (err) =>
            patchState(store, {
              error: err?.message ?? 'Unknown error',
              isLoading: false,
            })
        );
      },

      updateEmployee(employee: Employee) {
        patchState(store, { isLoading: true, error: null });
        employeeService.updateEmployee(employee).then(
          (updated) =>
            patchState(store, {
              employees: store
                .employees()
                .map((e) => (e.id === updated.id ? updated : e)),
              isLoading: false,
            }),
          (err) =>
            patchState(store, {
              error: err?.message ?? 'Unknown error',
              isLoading: false,
            })
        );
      },

      setFilter(filter: Partial<EmployeeFilter>) {
        patchState(store, (state) => ({
          filter: { ...state.filter, ...filter },
        }));
      },

      // New method to clear the filter
      clearFilter() {
        patchState(store, { filter: initialState.filter });
      },
    };
  }),

  withComputed((store) => ({
    filteredEmployees: computed(() => {
      const allEmployees = store.employees();
      const currentFilter = store.filter();

      return allEmployees.filter((employee) => {
        // Filter by city
        if (currentFilter.city && employee.city !== currentFilter.city) {
          return false;
        }

        // Filter by department
        if (
          currentFilter.department &&
          employee.department !== currentFilter.department
        ) {
          return false;
        }

        // Filter by firstName + lastName (case-insensitive)
        if (currentFilter.searchText) {
          const searchLower = currentFilter.searchText.toLowerCase();
          const fullName =
            `${employee.firstName} ${employee.lastName}`.toLowerCase();
          if (!fullName.includes(searchLower)) {
            return false;
          }
        }

        return true;
      });
    }),

    employees: computed(() => store.employees()),
    departments: computed(() =>
      [...new Set(store.employees().map((e) => e.department))].sort()
    ),

    cities: computed(() =>
      [...new Set(store.employees().map((e) => e.city))].sort()
    ),
    isLoading: computed(() => store.isLoading()),
    error: computed(() => store.error()),
    currentFilter: computed(() => store.filter()), // Expose the current filter
  }))
);
