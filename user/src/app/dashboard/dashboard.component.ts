import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Dashboard - Market Place');
    $("#dia-btn").click(function () {
      $(".diamond-dashboard").animate().show();
    });
    $("#diamond-close").click(function () {
      $(".diamond-dashboard").css({ "display": "none" });
    });
  }

}
