import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";

import * as moment from 'moment';
import { stringify } from 'querystring';
declare var $: any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private title: Title,private router:Router,private activatedRoute:ActivatedRoute,private authService:AuthService,private gigService:GigService) { }

order_id:string;
gig_id:string;
order_arr;
img:string;
name:string;
gig_title:string;
total_days:number;
total_amount:string;
date:string;
description:string;
actual_amount:number;
process_fee:number;
  ngOnInit() {

    this.order_id = this.activatedRoute.queryParams['_value'].order_id;
    this.gigService.get_orderby_id(this.order_id).subscribe(order => {
      // console.log(order);
      let or = order.msg[0];
      this.gig_id = or.gig_id;
      this.gigService.get_gig_byId(this.gig_id).subscribe(gig => {
        // console.log(gig);
        // this.order_arr = [{
        //     img:gig.msg.img1.replace('public',''),
        //     name:or.seller_fname+or.seller_lname,
        //     // last_name:or.seller_lname,
        //     order_id:or._id,
        //     title:gig.msg.title,
        //     total_days:parseInt(or.total_ext_days)+parseInt(or.assigned_days),
        //     total_amount:or.total_amount,
        //     date:moment(or.date).format("MMM Do YY"),
        //     description:or.description,
        //     actual_amount:or.total_amount/1.05,
        //     process_fee:or.total_amount-(or.total_amount/1.05),
        //     gig_id:this.gig_id
        // }]
        // console.log(this.order_arr);
             this.img = gig.msg.img1.replace('public',''),
            this.name = or.seller_fname+or.seller_lname,
            
            this.order_id=or._id,
            this.gig_title = gig.msg.title,
            this.total_days = parseInt(or.total_ext_days)+parseInt(or.assigned_days),
            this.total_amount = or.total_amount.toFixed(2),
            this.date = moment(or.date).format("MMM Do YY"),
            this.description = or.description,
            this.actual_amount = or.total_amount/1.05,
            this.process_fee = or.total_amount-(or.total_amount/1.05),
            this.gig_id = this.gig_id

      })
    })
  }

  goto_gig_det(gig_id){
    // alert(gig_id);
    this.router.navigate(['/gig'],{queryParams:{id:gig_id}});
  }
}
