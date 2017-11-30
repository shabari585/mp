import { Component,OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

// Importing services
import { AuthService } from "./services/auth.service";
import { ValidateService } from "./services/validate.service";

declare var $:any;

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

    // $('body').hide();


    // Mobile Menu
    $('.mob-menu-trig-btn').click(function(){
      const mob_menu_offest = $('.mob-menu').offset().left;
      if (mob_menu_offest < 0) {
          // $('.fvp, .svp, .main-footer,.checkout-main-container').animate({'margin-left':'50vw' },200);
          $('.mob-menu').animate({'left': '0vw'}, 200);
      }else {
          // $('.fvp, .svp, .main-footer,.checkout-main-container').animate({'margin-left':'0vw' },200);
          $('.mob-menu').animate({'left': '-50vw' }, 200);
      }
    });
    

  }
  closeMobMenu() {
    $('.mob-menu').animate({'left': '-50vw' }, 200);
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

    if(this.validateService.validateInput(this.regRole) && this.validateService.validateInput(this.regFirstName) && this.validateService.validateInput(this.regLastName) && this.validateService.validateInput(this.regEmail) && this.validateService.validateInput(this.regPassword)){
      
      if(this.validateService.validateEmail(this.regEmail)){
        
        // send the above values to backed for registration
        this.authService.registerUser(newUser).subscribe(res=>{
          if(res.success){

          }else{
            console.log(res);
          }
        });
      }else{

      }
      

    }else{
      // alert('else');
      switch (false) {
        case this.validateService.validateInput(this.regFirstName):
          $('#d-signup-f-name').css({'border-color':'#f00'});
          // $('#d-signup-f-name').hide();
          break;
      
        default:
          break;
      }
      
    }

    
  }
}