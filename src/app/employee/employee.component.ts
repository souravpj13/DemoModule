import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MyserviceService } from "../shared/myservice.service";
import { Employee } from "../shared/employee.model";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [MyserviceService]
})
export class EmployeeComponent implements OnInit {

  constructor(public myservice: MyserviceService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form)
    form.reset();
    this.myservice.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  onSubmit(form : NgForm) {
    if (form.value._id == "") {
    this.myservice.postEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshEmployeeList();
      console.log("Added Succesfully");
    });
  }
  else {
    this.myservice.putEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshEmployeeList();
      console.log("Updated Succesfully");
    });
  }
  }

  refreshEmployeeList() {
    this.myservice.getEmployeeList().subscribe((res) => {
      this.myservice.employees = res as Employee[];
    })
  }

  onEdit(emp: Employee) {
    this.myservice.selectedEmployee = emp;
  }

    onDelete(_id: string, form: NgForm) {
    if (confirm("Are you sure to delete it !") == true) {
      this.myservice.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
      });
    }
  }

}
