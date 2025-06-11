import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Employee } from "../models/employee";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class EmployeeService {
  private http = inject(HttpClient);
  private baseUrl = 'https://68486299ec44b9f34940bf34.mockapi.io/api';

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return   this.http.get<Employee[]>(`${this.baseUrl}/employee`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}/employee/${employee.id}`;
    return this.http.put<Employee>(url, employee);
  }

  
}