import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-create-gig',
  templateUrl: './create-gig.component.html',
  styleUrls: ['./create-gig.component.css']
})
export class CreateGigComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {

    this.title.setTitle('Create Gig - Market Place');

    // Close button
    $(".trl").click(function () {
      location.reload();
    });

    //  Panel one
    // Helpers
    $("#c-gig-cat").focus(function () {
      $(".helpers").hide();
      $("#cat-helper").toggle();
      // $("html,body").animate({scrollTop:$('#c-gig-one').offset().top});
    });
    $("#c-gig-cat").hover(function () {
      $(".helpers").hide();
      $("#cat-helper").toggle();
    });
    $("#title").focus(function () {
      $(".helpers").hide();
      $("#title-helper").toggle();
      $("html,body").animate({
        scrollTop: $('#c-gig-cat').offset().top - 80
      });
    });
    $("#title").hover(function () {
      $(".helpers").hide();
      $("#title-helper").toggle();
    });
    $("#title").keydown(function () {
      $(".helpers").hide();
      $("#title-helper").toggle();
    });
    $(".mce-container").focus(function () {
      $(".helpers").hide();
      $("#desc-helper").toggle();
    });
    $(".mce-container").hover(function () {
      $(".helpers").hide();
      $("#desc-helper").toggle();
    });
    $(".mce-container").keydown(function () {
      $(".helpers").hide();
      $("#desc-helper").toggle();
    });
    $("#skills-req-table").hover(function () {
      $(".helpers").hide();
      $("#skills-helper").toggle();
    });
    // Body Scroll
    // $("html,body").animate({scrollTop:$('#c-gig-two').offset().top-150});

    // Navigation button
    $("#f-n-btn").click(function () {
      $(".helpers").hide();
      var res = cGigOneCheck();
      // if (res == true) {
      //   $("#g-one-all-err").hide();
      //   $("#c-gig-one").hide();
      //   $("#c-gig-two").show();
      //   $(".one-check").show();
      //   $("#standard-price").focus();
      //   $("html,body").animate({
      //     scrollTop: $('#c-gig-two').offset().top - 150
      //   });
      // } else {
      //   $("#g-one-all-err").show();
      // }
    });
    $(".one-nav-btn").click(function () {
      $(".helpers").hide();
      $(".c-gig-divs").hide();
      $("#c-gig-one").show();
      $("html,body").animate({
        scrollTop: $('#c-gig-one').offset().top - 150
      });
    });
    $(".two-nav-btn").click(function () {
      $(".helpers").hide();
      $(".c-gig-divs").hide();
      $("#c-gig-two").show();
      $("html,body").animate({
        scrollTop: $('#c-gig-two').offset().top - 150
      });
    });
    $(".three-nav-btn").click(function () {
      $(".helpers").hide();
      $(".c-gig-divs").hide();
      $("#c-gig-three").show();
      $("html,body").animate({
        scrollTop: $('#c-gig-three').offset().top - 150
      });
    });
    $(".four-nav-btn").click(function () {
      $(".helpers").hide();
      $(".c-gig-divs").hide();
      $("#c-gig-four").show();
      $("html,body").animate({
        scrollTop: $('#c-gig-four').offset().top - 150
      });
    });
    // Validations
    function cGigOneCheck() {
      var cat = $("#c-gig-cat").val();
      var title = $("#title").val();
      // var desc = tinymce.get('c-gig-desc').getContent();
      //var desc = $("#c-gig-desc").val();
      // if (!cat || !title || !desc) {
      //   return false;
      // } else {
      //   return true;
      // }
    }

    // Panel two
    // Helpers
    $("#package-cost-tr").hover(function () {
      $(".two-helpers").hide();
      $("#package-cost-helper").toggle();
    });
    $("#package-details-tr").hover(function () {
      $(".two-helpers").hide();
      $("#package-desc-helper").toggle();
    });
    $("#package-delivery-tr").hover(function () {
      $(".two-helpers").hide();
      $("#package-delivery-helper").toggle();
    });
    $("#package-revisions-tr").hover(function () {
      $(".two-helpers").hide();
      $("#package-revision-helper").toggle();
    });
    $("#package-words-tr").hover(function () {
      $(".two-helpers").hide();
      $("#package-words-helper").toggle();
    });
    $("#package-seperate-files-tr").hover(function () {
      $(".two-helpers").hide();
      $("#package-seperate-files-helper").toggle();
    });
    $("#package-hq-files-tr").hover(function () {
      $(".two-helpers").hide();
      $("#package-hq-files-helper").toggle();
    });
    // Body scroll
    // $("#package-cost-tr input").click(function(){
    //   $("html,body").animate({scrollTop:$('#c-gig-two').offset().top-1});
    // });
    $("#package-cost-tr input").keydown(function () {
      $("html,body").animate({
        scrollTop: $('#c-gig-two').offset().top
      });
    });
    $("#package-name-tr input").click(function () {
      $("html,body").animate({
        scrollTop: $('#package-cost-tr').offset().top - 100
      });
    });
    $("#package-name-tr input").focus(function () {
      $("html,body").animate({
        scrollTop: $('#package-cost-tr').offset().top - 100
      });
    });
    // Navigation button
    $("#s-n-btn").click(function () {
      $(".helpers").hide();
      $("#g-2-all-err").hide();
      var res = cGigTwoCheck();
      if (res == true) {
        $("#g-2-all-err").hide();
        $("#c-gig-two").hide();
        $("#c-gig-three").show();
        // $(".two-check").show();
        $("html,body").animate({
          scrollTop: $('#c-gig-three').offset().top
        });
      } else {
        if (res == "st-price") {
          $("#st-price-er").show();
        } else if (res == "pre-price") {
          $("#pre-price-er").show();
        } else if (res == "pro-price") {
          $("#pro-price-er").show();
        } else if (res == "st-desc") {
          $("#st-desc-er").show();
        } else if (res == "pre-desc") {
          $("#pre-desc-er").show();
        } else if (res == "pro-desc") {
          $("#pro-desc-er").show();
        } else if (res == "st-del") {
          $("#st-del-er").show();
        } else if (res == "pre-del") {
          $("#pre-del-er").show();
        } else if (res == "pro-del") {
          $("#pro-del-er").show();
        } else if (res == "st-rev") {
          $("#st-rev-er").show();
        } else if (res == "pre-rev") {
          $("#pre-rev-er").show();
        } else if (res == "pro-rev") {
          $("#pro-rev-er").show();
        } else if (res == "st-words") {
          $("#st-words-er").show();
        } else if (res == "pre-words") {
          $("#pre-words-er").show();
        } else if (res == "pro-words") {
          $("#pro-words-er").show();
        }
        $("#g-2-all-err").show();
      }
    });
    // Validations
    function cGigTwoCheck() {
      var st_price = $("#standard-price").val();
      var pre_price = $("#premium-price").val();
      var pro_price = $("#pro-price").val();

      var st_desc = $("#std-details").val();
      var pre_desc = $("#pre-details").val();
      var pro_desc = $("#pro-details").val();

      var st_del = $("#standard-delivery").val();
      var pre_del = $("#premium-delivery").val();
      var pro_del = $("#pro-delivery").val();

      var st_rev = $("#s-revisions").val();
      var pre_rev = $("#pre-revisions").val();
      var pro_rev = $("#pro-revisions").val();

      var st_words = $("#std-words").val();
      var pre_words = $("#pre-words").val();
      var pro_words = $("#pro-words").val();

      if (!st_price || !pre_price || !pro_price || !st_desc || !pre_desc || !pro_desc || !st_del || !pre_del || !
        pro_del || !st_rev || !pre_rev || !pro_rev || !st_words || !pre_words || !pro_words) {
        if (!st_price) {
          return "st-price";
        } else if (!pre_price) {
          return "pre-price";
        } else if (!pro_price) {
          return "pro-price";
        } else if (!st_desc) {
          return "st-dec";
        } else if (!pre_desc) {
          return "pre-dec";
        } else if (!pro_desc) {
          return "pro-dec";
        } else if (!st_del) {
          return "st-del";
        } else if (!pre_del) {
          return "pre-del";
        } else if (!pro_del) {
          return "pro-del";
        } else if (!st_rev) {
          return "st-rev";
        } else if (!pre_rev) {
          return "pre-rev";
        } else if (!pro_rev) {
          return "pro-rev";
        } else if (!st_words) {
          return "st-words";
        } else if (!pre_words) {
          return "pre-words";
        } else if (!pro_words) {
          return "pro-words";
        }
      } else {
        return true;
      }
    }

    // Panel Three
    // Helpers

    // Adding more extras
    $("#add-more-extras-btn").click(function () {
      $("#ex-core").append(
        '<div class="ex-offer"><table class="ex-offer-table"><tr class="full-tr"><td class="offer-rest"><span class=""><a href="javascript:void(0)" class="cls-btn"><i class="fa fa-times"></i></a></span><input type="text" class="ex-offer-txt" name="ex-offer[]"></td><td class="offer-sm"><div class="ext-cost center"><span id="dlr">$</span><input type="text" class="cost-input" name="ex-cost[]"></div></td><td class="offer-xsm"><span class="center">in</span></td><td class="offer-mm"><div class="ext-cost days center"><input type="text" class="days-input"name="ex-days[]"><span id="days">days(s)</span></div></td></tr></table></div>'
      );
    });
    // Closing extras
    $(document).on("click", ".cls-btn", function (e) {
      e.preventDefault();
      // Clearing the values inside the inputs
      $(this).parent().parent().parent().parent().parent().parent().hide();
      $(this).parent().parent().parent().find('input.cost-input').val('');
      $(this).parent().parent().parent().find('input.days-input').val('');
      $(this).parent().parent().parent().find('input.ex-offer-txt').val('');
    });
    // Adding extra faq's
    $("#ad-faq-btn").click(function () {
      var q = $.trim($(".faq_question").val());
      var a = $.trim($(".faq_ans").val());
      if (q == "" || a == "") {

      } else {
        $(".faq-core").prepend(
          '<div class="faq"><h4 class="faq-head">Question</h4><input type="text" class="faq_question" name="faq_question[]" value=""><h4 class="faq-head">Answer</h4><textarea name="faq_answer[]" class="faq_ans" value=""></textarea></div></div>'
        );
      }
    });
    // Body scroll
    $("#first-faq").focus(function () {
      $("html,body").animate({
        scrollTop: $('.other-details').offset().top - 100
      });
    });
    // Navigation
    $("#t-n-btn").click(function () {
      $(".helpers").hide();
      if (cGigThreeCheck()) {
        $("#c-gig-three").hide();
        $("#c-gig-four").show();
        $(".three-check").show();
        $("html,body").animate({
          scrollTop: $('#c-gig-four').offset().top
        });
      } else {

      }
    });
    // Validations

    // Panel Four
    // Navigation
    $("#fr-n-btn").click(function () {
      $(".helpers").hide();
      if (cGigFourCheck()) {
        $("#c-gig-four").hide();
        $("#c-gig-five").show();
        $(".four-check").show();
        $("html,body").animate({
          scrollTop: $('#c-gig-five').offset().top
        });
      } else {
        // $("#gig-4-all-err").show();
      }
    });
    // Validations
    function cGigFourCheck() {
      var images = $("#file").val();
      if ($("#file").val() == '') {
        $("#select-main-img-err").show();
        $("#img-req-err").show();
        return false;
      } else {
        return true;
      }
    }

    // Panel Five
    // Validations
    $("#fv-n-btn").click(function () {
      $(".helpers").hide();
      if (1 == 1) {
        $("#c-gig-five").hide();
        $("#c-gig-post-success").show();
      } else {

      }
    });

    function cGigThreeCheck() {
      return true;
    }
    var up_pics = [];
    var del_pics = [];

    function imagePreview(input, p, img_type) {
      if (input.files) {
        var filesAmount = input.files.length;
        var files = input.files;
        var reader = new FileReader();
        reader.onload = function (event) {
          //   up_pics.push(files[id].name);
          var fname = files[0].name;
          fname = fname.slice(0, -4);
          // var et = event.target.result;
          // $(p).css({'background-image':et,'background-size':'cover'});
          // $(p).append('<img src="' + event.target.result +
          //   '" class="thumb" id="' + fname + '"><span class="dy-del-btn" id="' + img_type +
          //   '"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
          // $(p).append('<input type=\"radio\" class="in_radio" id=\"' + fname + 'i\" name=\"sel_img_name\" value=\"' +
          //   files[0].name + '\" style=\"display:none\">');
        }
        reader.readAsDataURL(input.files[0]);
      }
    };
    $('#file').change(function () {
      $("#file_label").hide();
      imagePreview(this, '#file_thumb', 'dis_img');
    });
    $('#filetwo').change(function () {
      $("#file_two_label").hide();
      imagePreview(this, '#filetwo_thumb', 'se_img');
    });
    $('#filethree').change(function () {
      $("#file_three_label").hide();
      imagePreview(this, '#filethree_thumb', 't_img');
    });
    $(document).on("click", ".dy-del-btn", function (e) {
      var idnme = $(this).attr('id')
      if (idnme == 'dis_img') {
        $(this).parent().find('.thumb').remove();
        $(this).parent().find('.in_radio').remove();
        $(this).remove();
        // empty #file 
        $('#file').val('');
        // Show #file_label
        $("#file_label").show();
      }
      if (idnme == 'se_img') {
        $(this).parent().find('.thumb').remove();
        $(this).parent().find('.in_radio').remove();
        $(this).remove();
        // empty #filetwo
        $('#filetwo').val('');
        // Show #file_two_label
        $("#file_two_label").show();
      }
      if (idnme == 't_img') {
        $(this).parent().find('.thumb').remove();
        $(this).parent().find('.in_radio').remove();
        $(this).remove();
        // empty #filethree
        $('#filethree').val('');
        // Show #file_three_label
        $("#file_three_label").show();
      }
      // Remove selection if selected
      // Remove from up_pics array
      if ($.inArray(idnme, up_pics) !== -1) {
        var ind = $.inArray(idnme, up_pics);
        up_pics.splice(ind, 1);
      }
      // var file = $('#' + fname);
      // $('.' + fname + '_no_del_class').hide();
    });
  }

}
