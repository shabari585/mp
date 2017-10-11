import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Typed from 'typed.js';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {

    this.title.setTitle('Market Place - Home');

    $("#get-started-button").click(function () {
      // window.location.href = "category-details.php";
    });

    $("#find-services-btn").click(function () {
      // window.location.href = "category-details.php";
    });
    var options = {
      strings: ["marketers build landing pages.", "landers build marketing pages.", "pages build landers and marketers."],
      typeSpeed: 30,
      showCursor: true,
      loop: true
    }

    var typed = new Typed(".ele", options);
    // $(function () {
    //   $(".ele").Typed({
    //     strings: ["marketers build landing pages.", "landers build marketing pages.", "pages build landers and marketers."],
    //     typeSpeed: 0,
    //     showCursor: true,
    //     loop: true
    //   });
    // });
  }

}
