import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $:any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    
    $(document).ready(
      function toggleVideo(state) {
        // if state == 'hide', hide. Else: show video
        var div = document.getElementById("popupVid");
        var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
        div.style.display = state == 'hide' ? 'none' : '';
        var func = state == 'hide' ? 'pauseVideo' : 'playVideo';
        iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
      }
    );

    this.title.setTitle('Categories - Market Place');
    $(".cat-btns").click(function () {
      if ($(this).parent().find('.sub-cat-cats').is(':visible')) {
        $(this).parent().find('.sub-cat-cats').hide();
      } else {
        $(this).parent().find('.sub-cat-cats').show();
      }
      $(".cat-btns").removeClass("cat-selected");
      $(this).addClass("cat-selected");
      var id = $(this).attr("id");
      if (id == "rc-btn") {
        var cat = "rc";
        var catt = "Resumes and Cover Letters";
      }
      if (id == "or-btn") {
        var cat = "or";
        var catt = "Online Resumes";
      }
      if (id == "vr-btn") {
        var cat = "vr";
        var catt = "Visual Resumes";
      }
      if (id == "lp-btn") {
        var cat = "lp";
        var catt = "LinkedIn Profile";
      }
      if (id == "ph1-btn") {
        var cat = "ph1";
        var catt = "Online Resumes";
      }
      if (id == "ph2-btn") {
        var cat = "ph2";
        var catt = "Online Resumes";
      }
      // Price
      // var p = $("#myRange").val();
      var pmin = $("#slider-range").slider("values", 0);
      var pmax = $("#slider-range").slider("values", 1);
      var r = $("#select-rating").val();
      // Rating
      //alert(cat);
      $("#top-cat-title").html(catt);
      $(".featured-gigs-div").load('redundant/category-gigs.php?c=' + cat + '&pmin=' + pmin + '&pmax=' + pmax +
        '&r=' + r);
      $(".h-gigs-div").load('redundant/h-category-gigs.php?c=' + cat + '&pmin=' + pmin + '&pmax=' + pmax +
        '&r=' + r);
      if (id == "all-products-btn") {
        $(".featured-gigs-div").load('redundant/category-gigs.php?pmin=' + pmin + '&pmax=' + pmax + '&r=' + r);
        $(".h-gigs-div").load('redundant/h-category-gigs.php?pmin=' + pmin + '&pmax=' + pmax + '&r=' + r);
      }
    });

    $(function () {
      $('#select-rating').barrating({
        theme: 'css-stars',
        initialRating: null,
        readonly: false,
        onSelect: function (value, text, event) {
          var pmin = $("#slider-range").slider("values", 0);
          var pmax = $("#slider-range").slider("values", 1);
          var r = value;
          var id = $(".cat-selected").attr("id");
          if (id == "rc-btn") {
            var cat = "rc";
          }
          if (id == "or-btn") {
            var cat = "or";
          }
          if (id == "vr-btn") {
            var cat = "vr";
          }
          if (id == "lp-btn") {
            var cat = "lp";
          }
          if (id == "ph1-btn") {
            var cat = "ph1";
          }
          if (id == "ph2-btn") {
            var cat = "ph2";
          }
        }
      });
    });
    $(function () {
      $('.rating').barrating({
        theme: 'css-stars',
        initialRating: null,
        readonly: true
      });
    });

    $("#grid-ico").click(function () {
      $("#list-ico").removeClass("v-selected");
      $("#grid-ico").addClass("v-selected");
      $(".h-gigs-div").hide();
      $(".featured-gigs-div,.gigs-core").show();
    });
    $("#list-ico").click(function () {
      $("#grid-ico").removeClass("v-selected");
      $("#list-ico").addClass("v-selected");
      $(".featured-gigs-div,.gigs-core").hide();
      $(".h-gigs-div").show();
    });
    $('.play-vid-btn').click(function () {
      $('.h-vid-div').show();
    });
    $('.c-btn').click(function () {
      $('.h-vid-div').hide();
    });
  }

}
