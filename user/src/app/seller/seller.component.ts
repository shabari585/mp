import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css','../gig-details/gig-details.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Seller Profile - Market Place');
    $("#req-custom-order").click(function () {
        $(".custom-order-div-back").css({ 'display': 'flex' });      
    });
  }

}
