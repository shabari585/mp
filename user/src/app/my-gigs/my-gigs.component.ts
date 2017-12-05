import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';


import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service"; 
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'app-my-gigs',
  templateUrl: './my-gigs.component.html',
  styleUrls: ['./my-gigs.component.css']
})
export class MyGigsComponent implements OnInit {

  constructor(private title: Title,private authService:AuthService,private gigService:GigService,private activatedRoute: ActivatedRoute,private router: Router) { }

user_id:string;
gigs;
orders;
final=[];
or_num:number;
to_be_del_id;
n_gig:string;
  ngOnInit() {

    // this.n_gig = this.activatedRoute.queryParams['_value'].gig;
    
    if(this.activatedRoute.queryParams['_value'].gig){
      $('.image').show();
    }else{
      $('.image').hide();
    }

    this.title.setTitle('Gig Details - Market Place');
    $('.click').click(function(){
        alert('hi')
      });
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.user_id = u.id;
        this.gigService.get_gigsby_id(this.user_id).subscribe(gig => {
          this.gigs = gig.msg;
          console.log(this.gigs);
        
        this.gigService.get_orders_seller(this.user_id).subscribe(order => {
          this.orders = order.msg;
          console.log(this.orders);
        
          this.gigs.forEach(gig => {
            this.or_num = 0;
          this.orders.forEach(order => {
            if(gig._id == order.gig_id){
              this.or_num = this.or_num+1;
            } else{
              this.or_num = 0;
            }         
          });
              this.final.push({
                  or_num:this.or_num,
                  img:gig.img1.replace('public',''),
                  title:gig.title,
                  gig_id:gig._id
              })
        });
        console.log(this.final);
      })
    })
  }

  hide_greeting(){
    $('.image').hide();
  }

  goto_gig_det(gig_id){
    this.router.navigate(["/gig"],{queryParams:{id:gig_id}});
    // alert(gig_id);
  }

  goto_edit_gig(gig_id){
    this.router.navigate(["/edit-gig"],{queryParams:{id:gig_id}});
  }

  delete_gig(gig_id){
    $('.pop-up').show();
   
    this.to_be_del_id = gig_id;
  }
  close_pop(){
    $('.pop-up').hide();
  }

  fin_delete_gig(){
      let gig_id = this.to_be_del_id;
     this.gigService.delete_gig(gig_id).subscribe(res => {
      console.log(res);
    })
  }
}
