import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';

import * as moment from 'moment';

import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";
declare var $: any;

@Component({
  selector: 'app-manage-sales',
  templateUrl: './manage-sales.component.html',
  styleUrls: ['./manage-sales.component.css']
})
export class ManageSalesComponent implements OnInit {

  constructor(private title: Title,private authService:AuthService,private gigService:GigService,private router:Router) { }

  all_orders;
  buyer_id=[];
  assigned_days:string;
  pro_com_date:string;
  order_date:string;
  project_days:number;
  total_ext_days:string;


  ngOnInit() {

    this.title.setTitle('Manage Sales - Market Place');

    $("#t-close").click(function () {
      $("#thanks-div").css({ "display": "none" });
    });
    $("#t-close").click(function () {
      $("#thanks-div").css({ "display": "none" });
    });
    $("#completed-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
      $(".orders-core").load('redundant/sells_completed.php');
    });
    $("#progress-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
      $(".orders-core").load('redundant/sells_in_progress.php');
    });
    $("#cancelled-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
      $(".orders-core").load('redundant/sells_cancelled.php');
    });
    $("#all-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
      $(".orders-core").load('redundant/sells_all.php');
    });
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    let user_id = u.id;
    this.gigService.get_orders_seller(user_id).subscribe(order => {
        this.all_orders  = order.msg;
        console.log(this.all_orders);  
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

  gotoseller(buyer_id){
    this.router.navigate(['/seller'],{queryParams:{id:buyer_id[0]}});
  }
}
