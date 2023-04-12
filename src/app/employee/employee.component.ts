import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { EmployeeService } from '../employee.service';  
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  dataSaved = false;  
  employeeForm: any;  
  allEmployees=[]
  employeeIdUpdate = null;  
  massage = null;  

  EmpId: string;  
  EmpName: string;  
  DateOfBirth: Date;  
  EmailId: string;  
  Gender: string;  
  Address: string;  
  PinCode: string;  

  constructor(
    private formbulider: FormBuilder, private employeeService:EmployeeService
  ) { }


  loadAllEmployees() {  
    this.employeeService.getAllEmployee().subscribe((res:any[])=>{
      this.allEmployees=res;
      console.log(res)
    });  

  }  
  onFormSubmit(employees) {  
    this.dataSaved = false;  
    let employee = employees;  
    console.log(employee)
    if(!employee['EmpId']){
      employee['EmpId'] = '1'
    }
    this.CreateEmployee(employee);  
    this.employeeForm.reset();  
  }  
  employees=[]
  loadEmployeeToEdit(employeeId) {  
   
    this.employeeService.getEmployeeById(employeeId).subscribe((employee:any[])=> {  
      console.log(employee)
      this.employees=employee
      this.massage = null;  
      this.dataSaved = false;  
      this.employeeIdUpdate = this.employees['EmpId'];  
      this.employeeForm.controls['EmpName'].setValue(this.employees['EmpName']);  
     this.employeeForm.controls['DateOfBirth'].setValue(this.employees['DateOfBirth']);  
      this.employeeForm.controls['EmailId'].setValue(this.employees['EmailId']);  
      this.employeeForm.controls['Gender'].setValue(this.employees['Gender']);  
      this.employeeForm.controls['Address'].setValue(this.employees['Address']);  
      this.employeeForm.controls['PinCode'].setValue(this.employees['PinCode']);  
     });  
  
  }  
  CreateEmployee(employee) {  
    if (this.employeeIdUpdate == null) {  
      this.employeeService.createEmployee(employee).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.loadAllEmployees();  
          this.employeeIdUpdate = null;  
          this.employeeForm.reset();  
        }  
      );  
    } else {  
      employee.EmpId = this.employeeIdUpdate;  
      this.employeeService.updateEmployee(employee).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadAllEmployees();  
        this.employeeIdUpdate = null;  
        this.employeeForm.reset();  
      });  
    }  
  }   
  deleteEmployee(employeeId) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllEmployees();  
      this.employeeIdUpdate = null;  
      this.employeeForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.employeeForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }  

  ngOnInit(): void {

    this.employeeForm = this.formbulider.group({  
      EmpName: ['', [Validators.required]],  
      DateOfBirth: ['', [Validators.required]],  
      EmailId: ['', [Validators.required]],  
      Gender: ['', [Validators.required]],  
      Address: ['', [Validators.required]],  
      PinCode: ['', [Validators.required]],  
    });  
    this.loadAllEmployees();  
  }

}
