import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { GigService } from "../services/gig.service";
import { forEach } from '@angular/router/src/utils/collection';

import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private title: Title,private activatedRoute: ActivatedRoute,private router: Router,private authService : AuthService,private gigService:GigService) { }

  user_id:string;
  first_name:string;
  last_name:string;
  email:string;
  profile_pic:string;
  country:string;
  city:string;
  skills:string;
  sk=[];
  skill_exist: boolean;
  description:string;
  date:string;
  us:any;

  rc_num:number;
  or_num:number;
  vr_num:number;
  lp_num:number;

  gigs=[];
  all_gigs = [];
  rc_gigs = [];
  or_gigs = [];
  vr_gigs = [];
  lp_gigs = [];

  all_len:number;
  reviews;
  f_rev=[];

 

  ngOnInit() {
    this.title.setTitle('Seller Profile - Market Place');
    $("#req-custom-order").click(function () {
        $(".custom-order-div-back").css({ 'display': 'flex' });      
    });

    this.user_id = this.activatedRoute.queryParams['_value'].id;

    console.log(this.user_id);
    this.authService.getUser(this.user_id).subscribe(dat => {
      console.log(dat);
      let us = dat.msg;
      this.first_name = us.first_name;
      this.last_name = us.last_name;
      this.profile_pic = us.profile_pic.replace('public','');
      this.country = us.country;
      this.city = us.city;
      this.email = us.email;
      this.skills = us.skills;
      this.sk = this.skills.split(",");
      console.log(this.sk);
      this.description = us.description;
      this.date = us.date;
      if(us.skills.length>0){
        this.skill_exist = true;
      }else{
        this.skill_exist = false;
      }
      
    })

    this.gigService.get_gigsby_id(this.user_id).subscribe(re => {
      // console.log(re);
      this.all_len = re.msg.length;
      console.log(this.all_len);
      if(re.msg.length>0){
        let pc_gigs = [];
        pc_gigs.push(re.msg);
        this.all_gigs = pc_gigs[0];
        this.gigs = this.all_gigs;
  
        this.gigs.forEach(element => {
          // rc
          if(element.category == 'rc'){
            this.rc_gigs.push(element);
          }
          // or
          if(element.category == 'or'){
            this.or_gigs.push(element);
          }
          // vr
          if(element.category == 'vr'){
            this.vr_gigs.push(element);
          }
          // lp
          if(element.category == 'lp'){
            this.lp_gigs.push(element);
          }
  
  
  
        });
        // aggrigate
        this.rc_num = this.rc_gigs.length;
        this.or_num = this.or_gigs.length;
        this.vr_num = this.vr_gigs.length;
        this.lp_num = this.lp_gigs.length;

      }else{
        $('.gigs-div').html("NO GIGS TO SHOW :(");
        $('.gigs-div').css("background-color","grey");
      }


    })
    // console.log(this.user_id);
    this.gigService.get_reviews(this.user_id).subscribe(order => {
      // console.log(order);
      this.reviews = order.msg;
      this.reviews.forEach(element => {
            // console.log(element.seller_id);
            this.authService.getUser(element.buyer_id).subscribe(us => {
              // console.log(us);
              let u = us.msg;
              let obj ={
                buyer_fname:u.first_name,
                buyer_lname:u.last_name,
                profile_pic:u.profile_pic,
                date:moment(element.date).format("MMM Do YY"),
                score:element.score,
                review:element.review
              }
              this.f_rev.push(obj);
              console.log(this.f_rev);
            })
      });
    })
  }
  closeCustOrder(){
    $(".custom-order-div-back").css({ 'display': 'none' });
  }

  gigs_get(cat){
    
    switch (cat) {
      case "all":
        this.gigs = this.all_gigs;
        break;
      case "rc":
        this.gigs = this.rc_gigs;
        break;
        case "or":
        this.gigs = this.or_gigs;
        break;
        case "vr":
        this.gigs = this.vr_gigs;
        break;
        case "lp":
        this.gigs = this.lp_gigs;
        break;
      default:
        break;
    }
    
  }

  addtoFav(gig_id){
    

       let fav ={
         gig_id:gig_id,
         user_id:this.user_id
   
       }
       this.gigService.add_to_fav(fav).subscribe(res => {
         console.log(res);
       })
       console.log(fav);
     }

   gotoGig(id){
      this.router.navigate(['/gig'], { queryParams: {id:id}});
  }
}
