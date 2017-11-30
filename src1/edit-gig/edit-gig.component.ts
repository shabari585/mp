import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-edit-gig',
  templateUrl: './edit-gig.component.html',
  styleUrls: ['./edit-gig.component.css','../create-gig/create-gig.component.css']
})
export class EditGigComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Edit Gig - Market Place');

    // Close button
    $(".trl").click(function () {
      location.reload();
    });
    // Customized text area
    // tinymce.init({
    //   selector: '#c-gig-desc',
    //   plugins: "image",
    //   toolbar: "image",
    //   menubar: false,
    //   statusbar: false,
    //   toolbar: 'bold italic underline | bullist numlist | link image'
    // });

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
    // $("#f-n-btn").click(function () {
    //   $(".helpers").hide();
      // var res = cGigOneCheck();
    //   if (res == true) {
    //     $("#g-one-all-err").hide();
    //     $("#c-gig-one").hide();
    //     $("#c-gig-two").show();
    //     $(".one-check").show();
    //     $("#standard-price").focus();
    //     $("html,body").animate({
    //       scrollTop: $('#c-gig-two').offset().top - 150
    //     });
    //   } else {
    //     $("#g-one-all-err").show();
    //   }
    // });
    // Validations
    // function cGigOneCheck() {
    //   var cat = $("#c-gig-cat").val();
    //   var title = $("#title").val();
    //   var desc = tinymce.get('c-gig-desc').getContent();
    //   //var desc = $("#c-gig-desc").val();
    //   if (!cat || !title || !desc) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }

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
        } else if (res == "st-name") {
          $("#st-name-er").show();
        } else if (res == "pre-name") {
          $("#pre-name-er").show();
        } else if (res == "pro-name") {
          $("#pro-name-er").show();
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

      if (!st_price || !pre_price || !pro_price || !st_desc || !pre_desc || !pro_desc || !st_del || !
        pre_del || !pro_del || !st_rev || !pre_rev || !pro_rev || !st_words || !pre_words || !
        pro_words) {
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
    // $("#ad-faq-btn").click(function () {
    //   var q = $.trim($(".faq_question").val());
    //   var a = $.trim($(".faq_ans").val());
    //   if (q == "" || a == "") {

    //   } else {
    //     $(".faq-core").prepend(
    //       '<div class="faq"><h4 class="faq-head">Question</h4><input type="text" class="faq_question" name="faq_question[]" value=""><h4 class="faq-head">Answer</h4><textarea name="faq_answer[]" class="faq_ans" value=""></textarea></div></div>'
    //     );
    //   }
    // });
    // // Body scroll
    // $("#first-faq").focus(function () {
    //   $("html,body").animate({
    //     scrollTop: $('.other-details').offset().top - 100
    //   });
    // });
    // Navigation
    // $("#t-n-btn").click(function () {
    //   $(".helpers").hide();
    //   if (cGigThreeCheck()) {
    //     $("#c-gig-three").hide();
    //     $("#c-gig-four").show();
    //     $(".three-check").show();
    //     $("html,body").animate({
    //       scrollTop: $('#c-gig-four').offset().top
    //     });
    //   } else {

    //   }
    // });
    // Validations

    // Panel Four
    // Navigation
    // $("#fr-n-btn").click(function () {
    //   $(".helpers").hide();
    //   if (cGigFourCheck()) {
    //     // Remove already existing related hidden inputs
    //     $('.up_pics_class').remove();
    //     // for each value in up_pic
    //     for (var j = 0; j < up_pics.length; j++) {
    //       // Append input hidden with sel_img_name name with array value as input value
    //       $('.list').append('<input type="hidden" name="up_img_name[]" class="up_pics_class" value="' +
    //         up_pics[j] + '"/>');
    //     }
    //     $("#c-gig-four").hide();
    //     $("#c-gig-five").show();
    //     $(".four-check").show();
    //     $("html,body").animate({
    //       scrollTop: $('#c-gig-five').offset().top
    //     });
    //   } else {
    //     // $("#gig-4-all-err").show();
    //   }
    // });

    // Validations
    function cGigFourCheck() {
      var images = $("#file").val();
      var total_img = parseInt($("#pic_s_inp").val());
      if (!images) {
        if (total_img > 0) {
          if ($('.selected').length == 0) {
            $("#select-main-img-err").show();
            return false;
          } else {
            return true;
          }
        } else {
          $("#img-req-err").show();
          return false;
        }
      } else {
        if ($('.selected').length == 0) {
          $("#select-main-img-err").show();
          return false;
        } else {
          return true;
        }
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

    $(".three-dot").click(function () {
      $(".helpers").hide();
      // if (cGigOneCheck() == true && cGigTwoCheck() == true) {
      //   $(".c-gig-divs").hide();
      //   $("#c-gig-three").show();
      // }
    });
    $(".four-dot").click(function () {
      $(".helpers").hide();
      $(".c-gig-divs").hide();
      $("#c-gig-four").show();
    });
    $(".five-dot").click(function () {
      $(".helpers").hide();
      $(".c-gig-divs").hide();
      $("#c-gig-five").show();
    });

    // function cGigThreeCheck() {
    //   return true;
    // }
    // var up_pics = [];
    // var del_pics = [];
    // var pinp = parseInt($("#pic_s_inp").val());
    // $(".del_btn").click(function () {
    //   var this_one = $(this);
    //   var this_id = $(this).attr('id');
    //   var favdata = "pic_id=" + this_id;
    //   $.ajax({
    //     type: 'POST',
    //     async: 'true',
    //     cache: 'false',
    //     data: favdata,
    //     url: 'functions/delete_pic_from_gig.php',
    //     success: function (data) {
    //       if (data == 'true') {
    //         this_one.hide();
    //         this_one.parent().hide();
    //         // $("#" + this_id + "pic").hide();
    //         var pinp = parseInt($("#pic_s_inp").val());
    //         var re = pinp - 1;
    //         $("#pic_s_inp").val(re);
    //         if ($(".file-ch-span").length) {

    //         } else {
    //           max_files++;
    //           if (max_files <= 3) {
    //             $(".file-ch-span").hide();
    //             $('.list').append(
    //               '<label><input type="file" name="files[]" class="files" multiple="true" style="display:none"><span class="file-ch-span"><div style="text-align:center"><i class="fa fa-picture-o" aria-hidden="true" style="color:#E9E9E9;font-size:400%"></i><br><br><div style="width:60%">You can upload ' + max_files + ' more files.</div></div></span></label>');
    //           }
    //         }
    //       }
    //       if (data == 'false') {
    //         // Don't do nothing
    //       }
    //     }
    //   });
    // });
    // $(document).on("click", ".dy-del-btn", function (e) {
    //   var idnme = $(this).attr('id');
    //   var parent = $(this).parent();
    //   if (parent.find('.thumb').hasClass('selected')) {
    //     $(".thumb").removeClass('selected');
    //   }
    //   idname = idnme.slice(0, -2);
    //   // alert(idname);
    //   fname = idname.slice(0, -4);
    //   // Remove selection if selected
    //   // Remove from up_pics array
    //   if (jQuery.inArray(idname, up_pics) !== -1) {
    //     var ind = jQuery.inArray(idname, up_pics);
    //     up_pics.splice(ind, 1);
    //   }
    //   var file = $('#' + fname);
    //   $('.' + fname + '_no_del_class').hide();
    //   file.parent().hide();
    //   max_files++;
    //   if (max_files <= 3) {
    //     $(".file-ch-span").hide();
    //     $('.list').append(
    //       '<label><input type="file" name="files[]" class="files" multiple="true" style="display:none"><span class="file-ch-span"><div style="text-align:center"><i class="fa fa-picture-o" aria-hidden="true" style="color:#E9E9E9;font-size:400%"></i><br><br><div style="width:60%">You can upload ' + max_files + ' more files.</div></div></span></label>');
    //   }
    // });
    // function imagesPreview(input, p) {
    //   if (input.files) {
    //     var filesAmount = input.files.length;
    //     var files = input.files;
    //     var id;
    //     if (filesAmount == 3) {
    //       id = 2;
    //     } else if (filesAmount == 2) {
    //       id = 1;
    //     } else if (filesAmount == 1) {
    //       id = 0;
    //     }
    //     for (i = 0; i < filesAmount; i++) {
    //       var reader = new FileReader();
    //       reader.onload = function (event) {
    //         up_pics.push(files[id].name);
    //         // alert(up_pics.toString());
    //         var fname = files[id].name;
    //         fname = fname.slice(0, -4);
    //         // alert(fname);
    //         $('.list').append('<div class="thumb-core"><img src="' + event.target.result + '" class="thumb" id="' + fname + '"><br><span class="dy-del-btn" id="' + files[id].name + 'id">Delete</span></div>');
    //         // $($.parseHTML('<img class="thumb" id="'+fname+'">')).attr('src', event.target.result).appendTo(p);
    //         // $('.list').append('<input type=\"checkbox\" class=\"'+fname+'_no_del_class\" name=\"no_del_img_name[]\" value=\"'+files[id].name+'\" style=\"display:none\" checked>');
    //         $('.list').append('<input type=\"radio\" id=\"' + fname + 'i\" name=\"sel_img_name\" value=\"' + files[id].name + '\" style=\"display:none\">');
    //         // $('.list').append('<input type=\"text\" value=\"'+fname+'\" style=\"display:block\">');
    //         // $('.list').append('<input type=\"text\" value=\"'+id+'\" style=\"display:block\">');
    //         id--;
    //       }
    //       reader.readAsDataURL(input.files[i]);
    //     }
    //   }
    // };
    // var max_files = 3 - parseInt(pinp);
    // $(document).on("change", ".files", function (e) {
    //   // e.preventDefault();
    //   var n = this.files.length;
    //   var num_files = parseInt(this.files.length);
    //   // alert(num_files);
    //   if (num_files == max_files) {
    //     // hide label
    //     for (var i = 0; i < this.files.length; i++) {
    //       var f = this.files[i];
    //       if ($.inArray(f.name, up_pics) !== -1) {
    //         alert('You have uploaded ' + f.name + ' already. If it\'s another image, please rename and re-upload');
    //       } else {
    //         // max_files = parseInt(max_files) - parseInt(num_files);
    //         $(".file-ch-span").hide();
    //         imagesPreview(this, 'div.list');
    //         break;
    //       }
    //     }
    //   } else if (num_files > max_files) {
    //     // Show warning
    //     $(".file-ch-span").html(
    //       '<h6 style="color:#f00; font-size:110%;width:60%;">Only three files are allowed!</h6>');
    //   } else if (num_files < max_files) {
    //     for (var i = 0; i < this.files.length; i++) {
    //       var f = this.files[i];
    //       if ($.inArray(f.name, up_pics) !== -1) {
    //         alert('You have uploaded ' + f.name +
    //           ' already. If it\'s another image, please rename and re-upload');
    //       } else {
    //         // max_files = parseInt(max_files) - parseInt(num_files);
    //         $(".file-ch-span").hide();
    //         // Show label with less max files
    //         imagesPreview(this, 'div.list');
    //         $('.list').append(
    //           '<label><input type="file" name="files[]" class="files" multiple="true" style="display:none"><span class="file-ch-span"><div style="text-align:center"><i class="fa fa-picture-o" aria-hidden="true" style="color:#E9E9E9;font-size:400%"></i><br><br><div style="width:60%">You can upload ' + max_files + ' more files.</div></div></span></label>');
    //         break;
    //       }
    //     }
    //   }
    // });
    $(document).on("click", ".thumb", function (e) {
      e.preventDefault();
      var n = $(this).attr('id');
      alert(n);
      $(".thumb").css({
        border: '6px solid transparent'
      });
      $(".thumb").removeClass('selected');
      // $(".thumb").attr('name','otherImg');
      $(this).css({
        border: '6px solid #0362a2'
      });
      $(this).addClass('selected');
      // var al = $(this).attr('id');
      $("#" + n + "i").prop("checked", true);
      // $("#"+al+"i").hide();
      // console.log($(this));
      // var nmm = $("#" + al + "i").attr('value');
      // alert($("#"+al+"radio").attr('value'));
    });
  }

}
