import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch  } from '@angular/common/http';
import { EmployeeService } from '../services/employee-serivce';
import { EmployeesStore } from '../stores/employees-store';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withFetch()), EmployeeService, EmployeesStore]
};
