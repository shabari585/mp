import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from "@angular/router";
// import Typed from 'typed.js';
declare var $:any;




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  loggedIn = false;

  constructor(private title: Title,private router:Router) { }

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

    // var typed = new Typed(".ele", options);
  }

  navToCategories(){
    this.router.navigateByUrl('/categories');
  }

}
