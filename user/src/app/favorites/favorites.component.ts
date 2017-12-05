import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GigService } from "../services/gig.service";
import { AuthService } from "../services/auth.service";
declare var $: any;

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private title: Title,private gigService:GigService,private authService:AuthService) { }

  fav_det:any;
  fav = [];
  user_id:string;
  first_name:string;
  last_name:string;
  length:boolean;

  ngOnInit() {
    this.title.setTitle('Favorites - Market Place');

    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.user_id = u.id;


    $(document).on("click", ".add-fav-btn", function (e) {
      e.preventDefault();
      $(this).parent().parent().parent().parent().remove();
      var num_gigs = $('.gig-links').length;
      if (num_gigs == 0) {
        $(".my-fav-div").load(location.href + " .my-fav-div");
      }
    });

    if(this.fav.length<0){
      this.length = true;
    }else{
      this.length = false;
    }

    this.gigService.get_fav(this.user_id).subscribe(dat => {
      this.fav_det = dat.msg;
      console.log(this.fav_det);
      this.fav_det.forEach(element => {
        console.log(element['gig_id']);
        this.authService.get_gig_det(element['gig_id']).subscribe(favs => {
          console.log(favs);
          if(favs.msg != null){
            this.fav.push(favs.msg);
          }
         
        })
      });
     
      this.authService.getUser(this.user_id).subscribe(dat =>{ 
        // console.log(dat);
        let us = dat.msg;
        this.first_name = us.first_name;
        this.last_name = us.last_name;
      })
    });
    console.log(this.fav);
    
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

}
