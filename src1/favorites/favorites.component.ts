import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Favorites - Market Place');


    $(document).on("click", ".add-fav-btn", function (e) {
      e.preventDefault();
      $(this).parent().parent().parent().parent().remove();
      var num_gigs = $('.gig-links').length;
      if (num_gigs == 0) {
        $(".my-fav-div").load(location.href + " .my-fav-div");
      }
    });
  }

}
