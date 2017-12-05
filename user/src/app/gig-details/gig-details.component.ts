import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";   

import * as moment from 'moment';
// import * as raty from 'raty-js';
declare var require: any;
require ('raty-js');
declare var $: any;

@Component({
  selector: 'app-gig-details',
  templateUrl: './gig-details.component.html',
  styleUrls: ['./gig-details.component.css']
})
export class GigDetailsComponent implements OnInit {

  constructor(private title: Title,private activatedRoute: ActivatedRoute,private router: Router,private authService:AuthService,private gigService:GigService) { 

    
  }

  selectedId:any;
  pac_cos_sta:string;
  pac_title:string;
  pac_cos_pre:string;
  pac_cos_pro:string;
  pac_det_sta:string;
  pac_det_pre:string;
  pac_det_pro:string;
  sf_sta:boolean;
  sf_pre:boolean;
  sf_pro:boolean;
  hq_sta:boolean;
  hq_pre:boolean;
  hq_pro:boolean;
  words_sta:string;
  words_pre:string;
  words_pro:string;
  rev_sta:string;
  rev_pre:string;
  rev_pro:string;
  pac_del_sta:string;
  pac_del_pre:string;
  pac_del_pro:string;
  description:string;
  days1:string;
  check1:string;
  doller1:string;
  description2:string;
  days2:string;
  doller2:string;
  img1:string;

  user_id:string;
  first_name:string;
  last_name:string;
  pro_pic:string;
  selected_pack = 'standard';
  amount:any;
  id:any;
  gig_id:string;
  ext;

  score = 0;
  seller_id:string;
  review:string;
  reviews=[];
  items : Array<any> = [];
  ngOnInit() {

    
    
     
    this.gig_id = this.activatedRoute.queryParams['_value'].id;
    this.authService.get_gig_det(this.gig_id).subscribe(res => {
      console.log(res);
      let g = res.msg;
    
      this.pac_cos_sta = g.pac_cos_sta;
      this.pac_title = g.title;
      this.pac_cos_pre = g.pac_cos_pre;
      this.pac_cos_pro = g.pac_cos_pro;
      this.pac_det_sta = g.pac_det_sta;
      this.pac_det_pre = g.pac_det_pre;
      this.pac_det_pro = g.pac_det_pro;
      this.sf_sta = g.sf_sta;
      this.sf_pre = g.sf_pre;
      this.sf_pro = g.sf_pro;
      this.hq_sta = g.hq_sta;
      this.hq_pre = g.hq_pre;
      this.hq_pro = g.hq_pro;
      this.words_sta = g.words_sta;
      this.words_pre = g.words_pre;
      this.words_pro = g.words_pro;
      this.rev_sta = g.rev_sta;
      this.rev_pre = g.rev_pre;
      this.rev_pro = g.rev_pro;
      this.pac_del_sta = g.pac_del_sta;
      this.pac_del_pre = g.pac_del_pre;
      this.pac_del_pro = g.pac_del_pro;
      this.description = g.description;
      this.amount = this.pac_cos_sta;
      this.img1 = g.img1.replace('public','');
      console.log(this.sf_pro);
      this.items = [
        {name:g.img1.replace('public','')},
        {name:g.img2.replace('public','')},
        {name:g.img3.replace('public','')},
        {name:g.img1.replace('public','')},
        {name:g.img2.replace('public','')},
        {name:g.img3.replace('public','')}
]
      console.log(this.items);
      this.seller_id = g.user_id;
      let user = localStorage.getItem('user');
      let u  = JSON.parse(user);
      this.user_id = u.id;

      this.authService.getUser(this.user_id).subscribe(dat => {
        // console.log(dat);
        let mu = dat.msg;

        this.first_name = mu.first_name;
        this.last_name = mu.last_name;
        this.pro_pic = mu.profile_pic.replace('public','');


      });

        this.gigService.get_gig_extrs(this.gig_id).subscribe(gig_ext => {
          console.log(gig_ext);
          this.ext = gig_ext.msg;
        })

        this.gigService.get_reviews(this.user_id).subscribe(rev => {
          // console.log(rev);
          if(rev.msg.length>0){
           
            // rev.msg.buyer_id
            rev.msg.forEach(element => {
              // console.log(element.buyer_id);
              this.authService.getUser(element.buyer_id).subscribe(buyer=>{
                // console.log(buyer.msg);
                  let object = {
                    buyer_fname:buyer.msg.first_name,
                    buyer_lname:buyer.msg.last_name,
                    pro_pic:buyer.msg.profile_pic,
                    date:moment(element.date).format("MMM Do YY"),
                    score:element.score,
                    review:element.review
                  }
                 this.reviews.push(object);
                 console.log(this.reviews);
              });
            });
            
          }
          // console.log(this.reviews.buyer_id);
        })
        
        
      
    this.gigService.get_fav_gig(this.id,this.user_id).subscribe(rs => {
      console.log(rs);
      if(rs.success){
        $('#add-fav-btn').html("Added to favorites");
      }else{
        $('#add-fav-btn').html("Add to favorites");
      }
    });

  
  });
  
    $('#standard-select-btn').click(function(){
      $('.package-select-btns').removeClass('pack-selected');
      $('.package-select-btns').html('Select');
      $(this).addClass('pack-selected');
      $(this).html('Selected <i class="fa fa-check" aria-hidden="true"></i>')
          this.amount = this.pac_cos_sta;
    })


    $('#premium-select-btn').click(function(){
      $('.package-select-btns').removeClass('pack-selected');
      $('.package-select-btns').html('Select');
      $(this).addClass('pack-selected');
      $(this).html('Selected <i class="fa fa-check" aria-hidden="true"></i>')
      this.amount = this.pac_cos_pre;
    })

    $('#pro-select-btn').click(function(){
      $('.package-select-btns').removeClass('pack-selected');
      $('.package-select-btns').html('Select');
      $(this).addClass('pack-selected');
      $(this).html('Selected <i class="fa fa-check" aria-hidden="true"></i>')
      this.amount = this.pac_cos_pro;
    });

    $('#raty').raty({
      starOn:'../assets/star-on.png', 
    starOff:'../assets/star-off.png',
    starHalf:'../assets/star-half.png',
    half: false ,
    // cancelOn:'../assets/cancel-on.png',
    // cancelOff:'../assets/cancel-off.png',
    // cancel:true,
    number:     5,
    click: function(score){
        this.score = score;
        localStorage.setItem('score',this.score);
    }
  
  });    
  }
      gotoProfile(id){
        this.router.navigate(['/seller'], { queryParams: {id:id}});
        // alert(id);
      }
      addtoFav(){
        
           let fav ={
             gig_id:this.gig_id,
             user_id:this.user_id
       
           }
           this.gigService.add_to_fav(fav).subscribe(res => {
             console.log(res);
           })
          //  console.log(fav);
         }

 

    order_service(){
      this.router.navigate(['/checkout'],{queryParams:{gig_id:this.gig_id,user_id:this.user_id, pack: this.selected_pack}});
      localStorage.setItem('selected_package',this.selected_pack);
      localStorage.setItem('extras',JSON.stringify(this.extras));
    }
    selected_package(pack){
      switch (pack) {
        case 'standard':

        this.amount = this.pac_cos_sta;
        this.selected_pack = 'standard';
        console.log(this.amount);
        
        break;
        case 'premium':

        this.amount = this.pac_cos_pre;
        this.selected_pack = 'premium';
        console.log(this.pac_cos_pre);

        break;
        case 'pro':

        this.amount = this.pac_cos_pro;
        this.selected_pack = 'pro';
        console.log(this.amount);
        
        break;

        default:
        break;
      }
    }
    extras:any={};
    addToCheckout(ext_id,event){
        if(this.extras[ext_id] === undefined || this.extras[ext_id] === null){
          this.extras[ext_id]=ext_id;               
        }else{
          this.extras[ext_id]= null;               
        }
      console.log(this.extras)
    }
    submit_review(){  
     
     let score = localStorage.getItem('score');
    //  let user = localStorage.getItem('user');

          let review = {
            buyer_id:this.user_id,
            seller_id:this.seller_id,
            buyer_fname:this.first_name,
            buyer_lname:this.last_name,
            gig_id:this.gig_id,
            score:score,
            review:this.review
          }
          // console.log(review);
          this.gigService.post_review(review).subscribe(review => {
            if(review.succes == true){
              $('#rating-show').hide();
            }
          })
    }
  }
    

