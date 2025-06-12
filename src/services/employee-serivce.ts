import { Injectable } from '@angular/core';
import { Employee } from '../models/employee'

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = 'https://68486299ec44b9f34940bf34.mockapi.io/api';

  constructor() {}

  async getEmployees(page: number = 1, limit: number = 18): Promise<{ employees: Employee[], totalCount: number }> {
    const url = `${this.baseUrl}/employee?page=${page}&limit=${limit}`;
    const response = await fetch(url);
    
    const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10);
    const employees = await response.json() as Employee[];
    console.log(`Fetched ${employees.length} employees from page ${page} with limit ${limit}. Total count: ${totalCount}`);
    console.log(employees);
    
    return { employees, totalCount };
  }

  async getEmployee(id: string): Promise<Employee> {
    const data = await fetch(`${this.baseUrl}/employee/${id}`);
    const employee = (await data.json()) as Employee;
    return employee;
  }
  async updateEmployee(employee: Employee): Promise<Employee> {
    console.log(employee);
    const url = `${this.baseUrl}/employee/${employee.id}`;
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Cache-Control,access_token, x-xsrf-token',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Origin': '*'
      }
    });
    const updatedEmployee = (await response.json()) as Employee;
    return updatedEmployee;
  }
}
