import { inject, Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = 'https://68486299ec44b9f34940bf34.mockapi.io/api';
  private http = inject(HttpClient);
  constructor() {
  }

  getEmployees(
    page: number = 1,
    limit: number = 10
  ): Observable<{ employees: Employee[]; totalCount: number }> {
    const url = `${this.baseUrl}/employee?page=${page}&limit=${limit}`;
    return this.http.get<{employees: Employee[] , totalCount: number }>(url).pipe(
      map(response => {      
        const employees = (response as any).items || (response as any); 
        const totalCount = (response as any).count || 50;

        return { employees: employees, totalCount: totalCount };
      })
    );
  }

  async getEmployee(id: string): Promise<Employee> {
    const data = await fetch(`${this.baseUrl}/employee/${id}`);
    const employee = (await data.json()) as Employee;
    return employee;
  }
  async updateEmployee(employee: Employee): Promise<Employee> {
    const url = `${this.baseUrl}/employee/${employee.id}`;
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(employee),
     
    });
    const updatedEmployee = (await response.json()) as Employee;
    return updatedEmployee;
  }
}
