import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router , ActivatedRoute , Params } from "@angular/router";
import { AdminService } from "../services/admin.service";
import { ValidateService } from "../services/validate.service";
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

declare var $:any;

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private adminService:AdminService , private validate:ValidateService, private router:Router) { }
email:string;
password:string;

  ngOnInit() {

  }
  submit(){

    if(this.validate.validateInput(this.email) && this.validate.validateInput(this.password)){
      if(this.validate.validateEmail(this.email)){
        let admin = {
          email:this.email,
          password:this.password
        }
        this.adminService.authenticate(admin).subscribe(dat => {
          console.log(dat);
          if(dat.success){
            localStorage.setItem('adminToken',dat.token);
            localStorage.setItem('admin',JSON.stringify(dat.msg));
            this.router.navigate(['/admin-dashboard']);
          }else{
            $('.pass-err').html('Incorrect password');
          }
        })
      }else{
        $('.email-err').html('Please enter a valid Email!!');
        $('#email').css({'border-color':'1px solid red'})
      }
    }else{
      $('.email-err').html('Cannot be left blank');
      $('email').css({'border-color':'1px solid red'})
      $('.pass-err').html('Cannot be left blank');
      $('password').css({'border-color':'1px solid red'})
    }
    
  }

}
