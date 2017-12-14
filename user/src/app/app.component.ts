import { Component,OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

// Importing services
import { AuthService } from "./services/auth.service";
import { ValidateService } from "./services/validate.service";
import { GigService } from "./services/gig.service";
import { locales } from 'moment';
import { PLATFORM_SERVER_ID } from '@angular/common/src/platform_id';
declare var $:any;

// declare const gapi : any;
import gapi from 'gapi-client';
import * as moment from "moment";
import { setInterval } from 'timers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService, private validateService:ValidateService,private gigService:GigService) {
    
  }

  title = 'app';
  user_id:string;
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

  //Login values
  loginEmail:string;
  loginPassword:string;

  public user:object;
  public uName:string;

  all:string;
  rc:any;
  or:any;
  vr:any;
  lp:any;
not_arr = [];
f_not_arr = [];
not_num = [];
f_not_num = [];
unread_num:number;
new_not_arr = [];

  ngOnInit(){   
// google login
    gapi.load('auth2', function () {
      gapi.auth2.init()
   });


   let user = localStorage.getItem('user');
   let u = JSON.parse(user);
      this.user_id = u.id;
        this.gigService.get_notifications(this.user_id).subscribe(not => {
          //  console.log(not);
           this.not_arr = not.msg;
           this.not_arr.forEach(element => {
             if(element.status == "not_seen" || element.status == "seen"){
               this.not_num.push({
                image:element.image.replace('public',''),
                message:element.message.substr(0,17),
                date:moment(element.date).fromNow(),
                status:element.status,
                link:element.link,
                not_id:element._id
               })
             }       
           });          
            this.f_not_num = this.not_num.reverse().slice(0,3);
            console.log(this.f_not_num);
            if(this.not_num.length === 0){
              this.unread_num = 0;
               $('#not_down').hide();
            }else{
              this.unread_num = this.f_not_num.length;
            }                    
         setInterval(()=>{
          this.gigService.get_notifications(this.user_id).subscribe(new_not =>{
              this.new_not_arr = new_not.msg;
            if(this.new_not_arr.length != this.not_num.length){
              this.f_not_num = this.new_not_arr.reverse().splice(0,3);
            }
          })
         },5000);
        });
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
name;
  googleSignup() {
    let googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
       googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
        var profile = googleUser.getBasicProfile();
        // console.log('ID: ' + profile.getId()); 
        // console.log('Name: ' + profile.getName().split(" "));
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); 
          this.name = profile.getName().split(" ");         
          this.regFirstName = this.name[0];
          this.regLastName = this.name[1];
          this.regEmail = profile.getEmail()               
       });
    });
 }

  SignUp(event){
    let newUser = {
      role : this.regRole,
      first_name : this.regFirstName,
      last_name : this.regLastName,
      email : this.regEmail,
      pay_pal : this.regEmail,
      password : this.regPassword

    };
    // Validate
    if(this.validateService.validateInput(this.regRole) && this.validateService.validateInput(this.regFirstName) && this.validateService.validateInput(this.regLastName) && this.validateService.validateInput(this.regEmail) && this.validateService.validateInput(this.regPassword)){
      
      if(this.validateService.validateEmail(this.regEmail)){

        this.authService.authenticateEmail(this.regEmail).subscribe(res => {
           if(res.success == true){
             $('#serr').html('Email alredy exisrs');
           }else{
             // send the above values to backed for registration
             this.authService.registerUser(newUser).subscribe(res=>{
               if(res.success){
                   this.loginEmail = this.regEmail;
                   this.loginPassword = this.regPassword;
     
                   this.LoginSubmit();
                   
                 }else{
                  $('#serr').html('Registration Failed !!');
               }
             });
           }
        })        
      }else{
          $('#serr').html('Please enter a valid email');
      }
    }else{
      switch (false) {
        case this.validateService.validateInput(this.regFirstName):         
          $('#serr').html('First name required');
          break;
          case this.validateService.validateInput(this.regLastName):         
          $('#serr').html('Last name required');
          break;
          case this.validateService.validateInput(this.regEmail):         
          $('#serr').html('Email required');
          break;
          case this.validateService.validateInput(this.regPassword):         
          $('#serr').html('Password required');
          break;
      
        default:
          break;
      }      
    }    
  }
  
  googleLogin() {
    let googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
       googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
        var profile = googleUser.getBasicProfile();
        // console.log('ID: ' + profile.getId()); 
        // console.log('Name: ' + profile.getName().split(" "));
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); 
          // this.name = profile.getName().split(" ");         
          // this.regFirstName = this.name[0];
          // this.regLastName = this.name[1];
          this.loginEmail = profile.getEmail()               
       });
    });
 }
  LoginSubmit(){
    if(this.validateService.validateInput(this.loginEmail) && this.validateService.validateInput(this.loginPassword)){

      if(this.validateService.validateEmail(this.loginEmail)){
        // email verification
        this.authService.authenticateEmail(this.loginEmail).subscribe(data =>{
          if (data.success){
            let user = {
              email :this.loginEmail,
              password: this.loginPassword
            }
            this.authService.authenticateUser(user).subscribe(dat =>{
              console.log(dat);
              if (dat.success){
                this.uName = dat.user.name;

                this.authService.storeUserData(dat.token, dat.user);
                this.closeShowBack(true);
              }else{
                $('#login-err').html('Incorrect Password !')
              }

            })
          }else{
            $('#login-err').html('Email not found !')
            }
        })
      }else{
        switch(false){
          case this.validateService.validateEmail(this.loginEmail):
          $('#login-err').html('Please enter a valid email id')
        }
      }
    }else{
        switch(false){
          case this.validateService.validateInput(this.loginEmail):
          $('#login-err').html('Email Id cannot be left blank');
          break;
          case this.validateService.validateInput(this.loginPassword):
          $('#login-err').html('Password cannot be left blank')
          default:
          break;

        }
    }
    // if (this.validateService.validateEmail(this))
  }
Logout(){
  this.authService.logout();
  return false;
  }
  
  gotoseller(){

    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.user_id = u.id;
    this.router.navigate(['/seller'], { queryParams: {id:this.user_id}});
  }

  get_gigs(cat){
    switch (cat) {
      case "all":
      // this.all = 'all';
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "rc":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "or":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "vr":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "lp":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
    
      default:
        break;
    }
  }
order_id:string;
not_id:string;
destination:string;
  goto_order_det(destination,order_id,not_id){
    this.destination = destination;
    this.not_id = not_id;
    this.order_id = order_id;
    let not = {
      not_id:this.not_id
    }
    this.gigService.change_not_status(not).subscribe(not => {
      console.log(not);
    })
    // this.unread_num--;
      switch (this.destination) {
        case "order-details":
        this.router.navigate(['/order-details'],{queryParams:{order_id:this.order_id}});
          break;
          case "gig":
          this.router.navigate(['/gig'],{queryParams:{id:this.order_id}});
        default:
          break;
      }
    
  }
  toZero(){
      this.unread_num = 0;
      // alert("hii");
  }
  go_to_not(){
    this.router.navigate(['/notifications']);
  }


}