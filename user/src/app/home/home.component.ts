import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd , ActivatedRoute} from "@angular/router";

import { AuthService } from "../services/auth.service";
import { GigService } from "../services/gig.service";
import Typed from 'typed.js';

declare var $:any;




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  loggedIn = false;
  id:string;
  gig_title:string;
  gigs = [];
  user_id:string;
  first_name:string;
  last_name:string;
  all_gigs;
  rc_gigs=[];
  or_gigs=[];
  vr_gigs=[];
  lp_gigs=[];
  constructor(private title: Title,private router:Router,private activatedRoute: ActivatedRoute,private authService:AuthService, private gigService:GigService) { }

  ngOnInit() {

    this.title.setTitle('Market Place - Home');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    var options = {
      strings: ["marketers build landing pages.", "landers build marketing pages.", "pages build landers and marketers."],
      typeSpeed: 30,
      showCursor: true,
      loop: true
    }

    var typed = new Typed(".ele", options);

    this.gigService.get_all_gigs().subscribe(dat => {
      if(dat.success){
        this.all_gigs = dat.msg;
        this.gigs = this.all_gigs;
        console.log(this.gigs);
          this.all_gigs.forEach(element => {
            if(element.category == 'rc'){
              this.rc_gigs.push(element);
            }
            if(element.category == 'or'){
              this.or_gigs.push(element);
            }
            if(element.category == 'vr'){
              this.vr_gigs.push(element);
            }
            if(element.category == 'lp'){
              this.lp_gigs.push(element);
            }
          });
        this.user_id = this.gigs[0].user_id;           
        // console.log(user_id);
        this.authService.getUser(this.user_id).subscribe(re => {
          // console.log(re);
          let us = re.msg;
          this.first_name = us.first_name;
          this.last_name = us.last_name;
        })
      }
    });

   
  }

  navToCategories(){
    this.router.navigateByUrl('/categories');
  }

  gotoGig(id){
    this.router.navigate(['/gig'], { queryParams: {id:id}});
  }

  addtoFav(gig_id){
 
    let fav ={
      gig_id:gig_id,
      user_id:this.user_id

    }
    this.gigService.add_to_fav(fav).subscribe(res => {
      console.log(res);
    })
    // console.log(fav);
  }
  get_gigs(cat){
    switch (cat) {
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
    
      default:
        break;
    }
  }
}
