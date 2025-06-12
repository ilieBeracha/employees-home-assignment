import { Injectable } from '@angular/core';
import { Employee } from '../models/employee'

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = 'https://68486299ec44b9f34940bf34.mockapi.io/api';

  constructor() {}

  async getEmployees(): Promise<Employee[]> {
    const data = await fetch(`${this.baseUrl}/employee`).then((res) =>
      res.json()
    );
    const employees = data as Employee[];
    return employees;
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
    console.log(response)
    console.log(response.status);

    console.log(await response.json());
    const updatedEmployee = (await response.json()) as Employee;
    return updatedEmployee;
  }
}
