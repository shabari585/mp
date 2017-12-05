import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { GigService } from "../services/gig.service";

declare var $:any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private title: Title,private authService : AuthService,private gigService:GigService,private activatedRoute:ActivatedRoute , private router:Router) { }

  gigs=[];
  all_gigs = [];
  rc_gigs = [];
  or_gigs = [];
  vr_gigs = [];
  lp_gigs = [];

  rc_num:number;
  or_num:number;
  vr_num:number;
  lp_num:number;
  all_len:number;

  first_name:string;
  last_name:string;
  user_id:string;

  cat:string;

  ngOnInit() {
    
    $(document).ready(
      function toggleVideo(state) {
        // if state == 'hide', hide. Else: show video
        var div = document.getElementById("popupVid");
        var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
        div.style.display = state == 'hide' ? 'none' : '';
        var func = state == 'hide' ? 'pauseVideo' : 'playVideo';
        iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
      }
    );

    this.title.setTitle('Categories - Market Place');
    $(".cat-btns").click(function () {
      if ($(this).parent().find('.sub-cat-cats').is(':visible')) {
        $(this).parent().find('.sub-cat-cats').hide();
      } else {
        $(this).parent().find('.sub-cat-cats').show();
      }
      $(".cat-btns").removeClass("cat-selected");
      $(this).addClass("cat-selected");
      var id = $(this).attr("id");
      if (id == "rc-btn") {
        var cat = "rc";
        var catt = "Resumes and Cover Letters";
      }
      if (id == "or-btn") {
        var cat = "or";
        var catt = "Online Resumes";
      }
      if (id == "vr-btn") {
        var cat = "vr";
        var catt = "Visual Resumes";
      }
      if (id == "lp-btn") {
        var cat = "lp";
        var catt = "LinkedIn Profile";
      }
      if (id == "ph1-btn") {
        var cat = "ph1";
        var catt = "Online Resumes";
      }
      if (id == "ph2-btn") {
        var cat = "ph2";
        var catt = "Online Resumes";
      }

    });

    $("#grid-ico").click(function () {
      $("#list-ico").removeClass("v-selected");
      $("#grid-ico").addClass("v-selected");
      $(".h-gigs-div").hide();
      $(".featured-gigs-div,.gigs-core").show();
    });
    $("#list-ico").click(function () {
      $("#grid-ico").removeClass("v-selected");
      $("#list-ico").addClass("v-selected");
      $(".featured-gigs-div,.gigs-core").hide();
      $(".h-gigs-div").show();
    });
    $('.play-vid-btn').click(function () {
      $('.h-vid-div').show();
    });
    $('.c-btn').click(function () {
      $('.h-vid-div').hide();
    });

    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.user_id = u.id;
   
    this.gigService.get_gigsby_id(this.user_id).subscribe(re => {
      console.log(re);
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
      if(this.activatedRoute.queryParams['_value'].cat){
        switch (this.activatedRoute.queryParams['_value'].cat) {
          case 'all':
            this.gigs = this.all_gigs;
            break;
          case 'rc':
            this.gigs = this.rc_gigs;
            break;
          case 'or':
            this.gigs = this.or_gigs;
            break;
          case 'vr':
            this.gigs = this.vr_gigs;
            break;  
          case 'lp':
            this.gigs = this.lp_gigs;
            break;   
        }
      }else{
          // this.gigs=this.all_gigs;
      }

    });
    

   
    this.authService.getUser(this.user_id).subscribe(re =>{
      let u = re.msg;
      this.first_name = u.first_name;
      this.last_name = u.last_name;
  });
  }

  gotoGig(id){
    this.router.navigate(['/gig'], { queryParams: {id:id}});
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
  }
  


