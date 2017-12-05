import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import * as moment from 'moment';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";
declare var $: any;

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  constructor(private title: Title , private router:Router, private activatedRoute:ActivatedRoute, private authService:AuthService,private gigServie:GigService) { }

order:string;
all_orders;
total_cost:number;
date:string;
dis_date=[];
gig_id:string;
user_id:string;
selected_pac:string;
first_name:string;
last_name:string;
assigned_days:number;
selected_extras:string;
total_days:number;
total_ext_days:number;
project_days:number;
pro_com_date:string;
order_date:string;

  ngOnInit() {
    this.title.setTitle('Manage Orders - Market Place');

    $("#t-close").click(function () {
      $("#thanks-div").css({ "display": "none" });
    });
    $("#completed-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
      $(".orders-core").load('redundant/buys_completed.php');
    });
    $("#progress-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
      $(".orders-core").load('redundant/buys_in_progress.php');
    });
    $("#cancelled-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
      $(".orders-core").load('redundant/buys_cancelled.php');
    });
    $("#all-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
      $(".orders-core").load('redundant/buys_all.php');
    });

    this.order = this.activatedRoute.queryParams['_value'].order;
    
    if(this.order == 'neworder'){
      $('#thanks-div').show();
    }else{
      $('#thanks-div').hide();
    }
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    let buyer_id = u.id;
    // console.log(buyer_id);
    this.gigServie.get_orders_buyer(buyer_id).subscribe(order => {
      this.all_orders = order.msg;
     console.log(order);
      this.all_orders.forEach(element => {
        this.assigned_days = element.assigned_days;
          this.total_ext_days = element.total_ext_days;
          this.project_days = +this.assigned_days + +this.total_ext_days;
          // console.log(element.days);
          this.pro_com_date = moment(element.date).add(this.project_days, 'day').format("MMM Do YY"); 
         this.order_date = moment(element.date).format("MMM Do YY"); 
        });
    })       
  }

  gotoseller(seller_id){
    this.router.navigate(['/seller'],{queryParams:{id:seller_id[0]}});
      // console.log(seller_id);
  }
}
