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
  filter: EmployeeFilter;
  currentPage: number;
  pageSize: number;

  totalItems: number;
}

interface EmployeeFilter {
  city: string | null;
  department: string | null;
  searchText: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  isLoading: false,
  error: null,
  filter: {
    city: null,
    department: null,
    searchText: null,
  },
  currentPage: 1,
  pageSize: 10,
  totalItems: 10,
};

export const EmployeesStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    const employeeService = inject(EmployeeService);
    return {
      async loadEmployees() {
        patchState(store, { isLoading: true, error: null });

        employeeService
          .getEmployees(store.currentPage(), store.pageSize())
          .subscribe({
            next: (data) => {
              const employees = data.employees;
              const totalCount = data.totalCount;

              patchState(store, {
                employees,
                totalItems: totalCount,
                isLoading: false,
              });
            },
            error: (err) => {
              patchState(store, {
                error: err?.message ?? 'Unknown error loading employees',
                isLoading: false,
              });
            },
          });
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
          currentPage: 1,
        }));
        this.loadEmployees();
      },

      clearFilter() {
        patchState(store, { filter: initialState.filter, currentPage: 1 });
        this.loadEmployees();
      },

      goToPage(page: number) {
        if (page < 1 || page > store.totalItems()) {
          return;
        }
        patchState(store, { currentPage: page });
        this.loadEmployees();
      },

      setPageSize(size: number) {
        patchState(store, { pageSize: size, currentPage: 1 });
        this.loadEmployees();
      },

      async getEmployeeById(id: number): Promise<Employee | null> {
        patchState(store, { error: null });
        try {
          const fetchedEmployee = await employeeService.getEmployee(
            id.toString()
          );
          return fetchedEmployee;
        } catch (err: any) {
          if (err.status === 404 || err.message === 'Not Found') {
            return null;
          }
          patchState(store, {
            error: err?.message ?? `Error fetching employee with ID ${id}`,
          });
          throw err;
        }
      },
    };
  }),

  withComputed((store) => ({
    filteredEmployees: computed(() => {
      const allEmployees = store.employees();
      const currentFilter = store.filter();

      return allEmployees.filter((employee) => {
        if (currentFilter.city && employee.city !== currentFilter.city) {
          return false;
        }

        if (
          currentFilter.department &&
          employee.department !== currentFilter.department
        ) {
          return false;
        }

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

    totalPages: computed(() =>
      Math.ceil(store.totalItems() / store.pageSize())
    ),
    currentPage: computed(() => store.currentPage()),
    pageSize: computed(() => store.pageSize()),
    totalItems: computed(() => store.totalItems()),
    hasPreviousPage: computed(() => store.currentPage() > 1),
    hasNextPage: computed(() => store.currentPage() < store.totalItems()),
    allEmployees: computed(() => store.employees()),
    departments: computed(() =>
      [...new Set(store.employees().map((e) => e.department))].sort()
    ),
    cities: computed(() =>
      [...new Set(store.employees().map((e) => e.city))].sort()
    ),
    isLoading: computed(() => store.isLoading()),
    error: computed(() => store.error()),
    currentFilter: computed(() => store.filter()),
  }))
);
