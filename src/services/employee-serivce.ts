import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Employee } from "../models/employee";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class EmployeeService {
  private baseUrl = 'https://68486299ec44b9f34940bf34.mockapi.io/api';
  private http = inject(HttpClient);

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return   this.http.get<Employee[]>(`${this.baseUrl}/employee`);
  }

  static getInstance() {
    return new EmployeeService();
  }
}