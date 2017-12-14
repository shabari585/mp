import { Component, OnInit, ElementRef } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ValidateService} from '../services/validate.service';
import { DatePipe } from '@angular/common';
// import {ImageUploadModule} from 'angular2-image-upload';
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../settings/settings.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private validateService: ValidateService,private element:ElementRef){}

  first_name:string;
  last_name:string;
  user_email:string;
  user_skills:string;
  user_address:string;
  user_city:string;
  user_country:string;
  user_description:string;
  user_img: string;
  user:object;
  user_id:any;
  files:any;
  file:any;
  profile_pic:string;
  // profile-pic:any;
  // user_image:any;

  ngOnInit() {

    $('#change-p-p-temp').hide();
    // // this.first_name = 'Bhargav';
    let u = localStorage.getItem('user');

    let user = JSON.parse(u);
    // console.log(user);
  let user_id = user.id;
  this.user_id = user_id;
  // alert(user_id);
    this.authService.getUser(user_id).subscribe(data => {
      if(data.success){
        console.log(data);
        let us = data.msg;
        this.first_name = us.first_name;
        this.last_name = us.last_name;
        this.user_email = us.email;
        this.user_skills = us.skills;
        this.user_address = us.address;
        this.user_city = us.city;
        this.user_country = us.country;
        this.user_description = us.description;
        this.user_img = us.profile_pic.replace('public','');
        console.log(this.user_img);

      }else{
        console.log(data);
      }
    })
  }
  saveUser(){

      //  console.log("save");
        let files = this.files;

        let formData = new FormData();
  //  console.log("files"); 
    if(this.files == undefined){
      files == '';
    }else{
      let file = files;
    }
  
    let user_id = this.user_id;
    let first_name = this.first_name;
    let last_name = this.last_name;
    let user_email = this.user_email;
    let user_skills = this.user_skills;
    let user_address = this.user_address;
    let user_city = this.user_city;
    let user_country = this.user_country;
    let user_description = this.user_description;
    // console.log(first_name+""+last_name);
    formData.append('file',this.files);
    formData.append('user_id',user_id);
    formData.append('first_name',first_name);
    formData.append('last_name',last_name);
    formData.append('user_email',user_email);
    formData.append('user_skills',user_skills);
    formData.append('user_address',user_address);
    formData.append('user_city',user_city);
    formData.append('user_country',user_country);
    formData.append('user_description',user_description);
    formData.append
    
    // console.log(formData.get('first_name'));
    
    // console.log(this.files);
    
    if(this.validateService.validateEmail(this.user_email) && this.validateService.validateInput(this.first_name) && this.validateService.validateInput(this.last_name)){
      if(this.authService.authenticateEmail(this.user_email)){
        this.authService.authUpdateUser(formData).subscribe(dat => {

          this.profile_pic = dat.msg.profile_pic.replace("public","");

            })
      }else{
        alert('one');
      }
    }else{
      alert('two');
    }
    //
    // // this.authService.authUpdataUser(user_det).subscribe(dat => {

    }

    url:any;
    // fileChange(event){

    //   this.files = event.target.files[0];
    //   }
    fileChange(input) {
     this.files = input.target.files[0];
    //  console.log(this.files);
      if (input.target.files && input.target.files['0']) {
          var reader = new FileReader();
          reader.onload = function (e) {
              $('#change-p-p')
                  .attr('src', e.target['result']);
          };

          reader.readAsDataURL(input.target.files['0']);
      }
  }
}


