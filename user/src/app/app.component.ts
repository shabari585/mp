import { Component,OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

// Importing services
import { AuthService } from "./services/auth.service";
import { ValidateService } from "./services/validate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService, private validateService:ValidateService) { }

  title = 'app';

  showDarkBack = false;
  showLoginDiv = false;
  showLogin = false;
  showSignUp = false;
  showFpSent = false;
  showFpDiv = false;
  showAuthorSignUp = false;

  // Registration values
  regRole:string;
  regFirstName:string;
  regLastName:string;
  regEmail:string;
  regPassword:string;

  ngOnInit(){

  }

  showBackLogin(bool){
    this.showDarkBack = bool;
    this.showLoginDiv = bool;
    this.showSignUp = !bool;
    this.showFpSent = !bool;
    this.showFpDiv = !bool;
    this.showLogin = bool;
  }
  showBackSignUp(bool){
    this.showDarkBack = bool;
    this.showLoginDiv = bool;
    this.showLogin = !bool;
    this.showFpSent = !bool;
    this.showFpDiv = !bool;
    this.showSignUp = bool;
  }
  showFp(bool){
    this.showDarkBack = bool;
    this.showLoginDiv = bool;
    this.showLogin = !bool;
    this.showFpSent = !bool;
    this.showFpDiv = bool;
    this.showSignUp = !bool;
  }
  showSentfp(bool){
    this.showDarkBack = bool;
    this.showLoginDiv = bool;
    this.showLogin = !bool;
    this.showFpSent = bool;
    this.showFpDiv = !bool;
    this.showSignUp = !bool;
  }
  closeShowBack(bool){
    this.showDarkBack = !bool;
    this.showLoginDiv = !bool;
    this.showLogin = !bool;
    this.showSignUp = !bool;
    this.showFpSent = !bool;
    this.showFpDiv = !bool;
    this.showAuthorSignUp = !bool;
  }
  SignUp(event){
    this.regRole;
    this.regFirstName;
    this.regLastName;
    this.regEmail;
    this.regPassword;

    let newUser = {
      role : this.regRole,
      first_name : this.regFirstName,
      last_name : this.regLastName,
      email : this.regEmail,
      password : this.regPassword
    }
    // Validate

    if(this.validateService.validateInput(this.regRole) || this.validateService.validateInput(this.regFirstName) || this.validateService.validateInput(this.regLastName) || this.validateService.validateInput(this.regEmail) || this.validateService.validateInput(this.regPassword)){

    }else{
      
    }

    // send the above values to backed for registration
    this.authService.registerUser(newUser).subscribe(res=>{
      if(res.success){
        // Registration successful

      }else{
        // Registration failed

      }
    });
    
  }
}