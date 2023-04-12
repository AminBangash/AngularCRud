import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  url = 'https://localhost:44318/Api/Employee';
  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' })
  };

  getAllEmployee() {
    return this.http.get(this.url + '/AllEmployeeDetails');
  }
  getEmployeeById(employeeId: string) {
    return this.http.get(this.url + '/GetEmployeeDetailsById/' + employeeId);
  }
  createEmployee(employee) {

    return this.http.post(this.url + '/InsertEmployeeDetails/',
      employee, this.httpOptions);
  }
  updateEmployee(employee) {

    return this.http.put(this.url + '/UpdateEmployeeDetails/',
      employee, this.httpOptions);
  }
  deleteEmployeeById(employeeid) {

    return this.http.delete<number>(this.url + '/DeleteEmployeeDetails?id=' + employeeid,
      this.httpOptions);
  }
}
