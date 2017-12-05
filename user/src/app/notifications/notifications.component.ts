import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";

declare var $: any;
import * as moment from "moment";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private title: Title,private router:Router,private activatedRoute:ActivatedRoute,private authService:AuthService,private gigService:GigService) { }

  user_id:string;
not_arr;
f_not_arr = [];
not_id:string;
order_id:string;
  ngOnInit() {
      let user = localStorage.getItem('user');
      let u = JSON.parse(user);
      this.user_id = u.id;
      // alert(this.user_id);
      this.gigService.get_notifications(this.user_id).subscribe(not => {
        console.log(not);
        this.not_arr = not.msg;
        console.log(this.not_arr);
        this.not_arr.forEach(element => {
          this.f_not_arr.push({
            image:element.image.replace('public',''),
            message:element.message,
            date:moment(element.date).fromNow(),
            status:element.status,
            link:element.link,
            not_id:element._id
          })
        });
        console.log(this.f_not_arr);
      })

  }
  
  goto_order_det(order_id,not_id){
      // alert(order_id+not_id);
      this.not_id = not_id;
      this.order_id = order_id;
      let not = {
        not_id:this.not_id
      }
      this.gigService.change_not_status(not).subscribe(not => {
        console.log(not);
      })

      this.router.navigate(['/order-details'],{queryParams:{order_id:this.order_id}});
  }

  all_read(){
      // alert(this.user_id);
      let user_id = {
        user_id:this.user_id
      }
      this.gigService.mark_all_read(user_id).subscribe(not => {
        console.log(not);
      })
  }
}
