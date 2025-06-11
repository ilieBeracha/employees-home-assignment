import { patchState, signalStore, withComputed, withMethods } from '@ngrx/signals';
import { withState } from '@ngrx/signals';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee-serivce';
import { computed } from '@angular/core';

interface EmployeesState {
    employees: Employee[];
    isLoading: boolean;
    error: string | null;
}

const initialState: EmployeesState = {
    employees: [],
    isLoading: false,
    error: null,
}

export const employeesStore = signalStore(
    withState(initialState),
    withMethods((store) => ({
        loadEmployees() {
            patchState(store, { isLoading: true, error: null });
            
            EmployeeService.getInstance().getEmployees().subscribe({
                next: (employees: Employee[]) => {
                    patchState(store, { employees: employees, isLoading: false });
                },
                error: (error: any) => {
                    patchState(store, { 
                        error: error.message ?? 'Unknown error', 
                        isLoading: false 
                    });
                }
            });
        },
    })),
    
    withComputed((store) => ({
        employees: computed(() => store.employees()),
        departments: computed(() => store.employees()),
    }))
)