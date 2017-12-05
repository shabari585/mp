import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from "../services/auth.service";
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  constructor(private title: Title,private authService:AuthService) { }
  user_id:string;
  alert:boolean;
  profile_pic:string;
  country:string;
  first_name:string;
  last_name:string;
  description:string;
  ngOnInit() {
    this.title.setTitle('Dashboard - Market Place');
    $("#dia-btn").click(function () {
      $(".diamond-dashboard").animate().show();
    });
    $("#diamond-close").click(function () {
      $(".diamond-dashboard").css({ "display": "none" });
    });

    let user = localStorage.getItem('user');
    
    let u = JSON.parse(user);
    this.user_id = u.id;


    this.authService.getUser(this.user_id).subscribe(dat => {
      console.log(dat);
      let us = dat.msg;
      if(us.address =="" || us.address == null || us.city == "" || us.city == null || us.country=="" || us.country==null || us.skills =="" || us.skills ==null || us.description =="" || us.description ==null ){
                     this.alert = true;
      }else{
                    this.alert = false;
      }
        this.first_name = us.first_name;
        this.last_name = us.last_name;
        this.country = us.country;
        this.description = us.description;
        this.profile_pic = us.profile_pic.replace('public','');
        // console.log(this.country);
    })
  }

}
