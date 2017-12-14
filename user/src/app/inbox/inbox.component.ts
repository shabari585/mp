import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import * as shortid from 'shortid';
import { Router , ActivatedRoute , Params } from "@angular/router";
import { GigService } from "../services/gig.service";

declare var $: any;

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private title: Title , private activatedRoute:ActivatedRoute , private gigService:GigService) { }

msg:string;
seller_id:string;
to_id:string;
from_id:string;
message:string;


  ngOnInit() {
    this.title.setTitle('Inbox - Market Place');
    if(this.activatedRoute.queryParams['_value'].seller_id){
      this.to_id = this.activatedRoute.queryParams['_value'].seller_id
    }
   
  }
conv_id:string;
send_msg(){
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    let new_conv = {
        from:u.id,
        to:this.to_id       
      }
      // console.log(new_msg);
      this.gigService.check_conversation(new_conv).subscribe(res =>{
        console.log(res);
        if(res.success){
          let newmsg = {
            conv_id:res.msg[0].conv_id,
            sender:u.id,
            to:this.to_id,
            message:this.msg,
            time:moment(),
            status:"not_seen"
          }
         this.gigService.send_message(newmsg).subscribe(msg => {
           console.log(msg);
         })
        }
      })

}
}
