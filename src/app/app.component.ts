import { Component } from '@angular/core';
import { EmployeesViewComponent } from './employees-view/employees-view.component';
@Component({
  selector: 'app-root',
  imports: [EmployeesViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employees-home-assignment';
}
