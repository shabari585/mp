import { Component, OnInit } from '@angular/core';
import { GigService } from "../services/gig.service";
import { AuthService } from "../services/auth.service";
import { AdminService } from "../services/admin.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private gigService:GigService,private authService:AuthService,private adminService:AdminService) { }

  total_users:number;
  total_gigs:number;
  total_sellers:number;
  sellers = [];
  users = [];
  last_ten;
  ngOnInit() {
    this.adminService.get_all_users().subscribe(users => {
      this.total_users = users.msg.length;
      // console.log(this.total_users);
      users.msg.forEach(element => {
        if(element.role === "author"){
          this.sellers.push(element);
        }
      });
      this.total_sellers = this.sellers.length;
      // console.log(this.total_sellers);
        this.users.push(users.msg);
        console.log(this.users);
        this.last_ten = users.msg.reverse().splice(0,10);
        console.log(this.last_ten);
    });
    this.adminService.get_all_gigs().subscribe(gigs => {
      this.total_gigs = gigs.msg.length;
      // console.log(this.total_gigs);
    })
  }

}
