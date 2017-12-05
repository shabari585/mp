import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService} from '../services/auth.service';
import { ValidateService} from '../services/validate.service';
import { GigService } from "../services/gig.service";
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-create-gig',
  templateUrl: './create-gig.component.html',
  styleUrls: ['./create-gig.component.css']
})
export class CreateGigComponent implements OnInit {
  
  constructor(private title: Title , private authService: AuthService , private validateService: ValidateService , private router:Router, private gigService:GigService ) { }
  
  tabOneCheck: boolean = false;
  tabTwoCheck: boolean = false;
  tabThreeCheck: boolean = false;
  tabFourCheck: boolean = false;

  // comp1
user_id:string;
gig_category: string;
gig_title: string;
gig_description: string;
comp1: string;
email=false;
profiles= false;
sharing= false;
social_login= false;
rating= false;
mobile= false;

// comp2
comp2: string;
pac_cos_sta: string;
pac_cos_pre: string;
pac_cos_pro: string;
pac_det_sta: string;
pac_det_pre: string;
pac_det_pro: string;
pac_del_sta: string;
pac_del_pre: string;
pac_del_pro: string;
rev_sta: string;
rev_pre: string;
rev_pro: string;
words_sta: string;
words_pre: string;
words_pro: string;
sf_sta= false;
sf_pre= false;
sf_pro= false;
hq_sta= false;
hq_pre= false;
hq_pro= false;

// comp3::
comp3: any;
doller1: string;
days1: string;
check1=false;
// check1:string;
description2: string;
doller2: string;
days2: string;
que1: string;
ans1: string;

// comp4
comp4: any;
img1: any;
img2: any;
img3: any;

extras = [];

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

    // Navigation button
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

    
    // Closing extras
    
    // Adding extra faq's
    
    // Body scroll

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

  gotoNexttab(gotoTab){
      switch (gotoTab) {
        case 'first':
          $(".helpers").hide();
          $(".c-gig-divs").hide();
          $("#c-gig-one").show();
          $("html,body").animate({
            scrollTop: $('#c-gig-one').offset().top - 150
          });
          break;
        case 'second':
        if (this.validateService.validateInput(this.gig_category) && this.validateService.validateInput(this.gig_title && this.validateService.validateInput(this.gig_description))){
          const comp1 = {
            category: this.gig_category,
            title: this.gig_title,
            description: this.gig_description,
            email: this.email,
            profiles: this.profiles,
            sharing: this.sharing,
            social_login: this.social_login,
            rating: this.rating,
            mobile: this.mobile
          };
          this.comp1 = JSON.stringify(comp1);
          localStorage.setItem('comp1', this.comp1);


          $('.helpers').hide();
          $('.c-gig-divs').hide();
          $('#c-gig-two').show();
          $('html,body').animate({
            scrollTop: $('#c-gig-two').offset().top - 150
          });

        }else{
          $('#comp1-err').html('All fields must be filled !!');

        }
          break;
        case 'third':
          // console.log(this.rev_sta);
          if (this.validateService.validateInput(this.pac_cos_sta) && this.validateService.validateInput(this.pac_cos_pre) && this.validateService.validateInput(this.pac_cos_pro) && this.validateService.validateInput(this.pac_det_sta) && this.validateService.validateInput(this.pac_det_pre) && this.validateService.validateInput(this.pac_det_pro) && this.validateService.validateInput(this.pac_del_sta) && this.validateService.validateInput(this.pac_del_pre) && this.validateService.validateInput(this.pac_del_pro) && this.validateService.validateInput(this.rev_sta) && this.validateService.validateInput(this.rev_pre) && this.validateService.validateInput(this.rev_pro) && this.validateService.validateInput(this.words_sta) && this.validateService.validateInput(this.words_pre) && this.validateService.validateInput(this.words_pro)) {
            
                        const comp2 = {
                          pac_cos_sta: this.pac_cos_sta,
                          pac_cos_pre: this.pac_cos_pre,
                          pac_cos_pro: this.pac_cos_pro,
                          pac_det_sta: this.pac_det_sta,
                          pac_det_pre: this.pac_det_pre,
                          pac_det_pro: this.pac_det_pro,
                          pac_del_sta: this.pac_del_sta,
                          pac_del_pre: this.pac_del_pre,
                          pac_del_pro: this.pac_del_pro,
                          rev_sta: this.rev_sta,
                          rev_pre: this.rev_pre,
                          rev_pro: this.rev_pro,
                          words_sta: this.words_sta,
                          words_pre: this.words_pre,
                          words_pro: this.words_pro,
                          sf_sta: this.sf_sta,
                          sf_pre: this.sf_pre,
                          sf_pro: this.sf_pro,
                          hq_sta: this.hq_sta,
                          hq_pre: this.hq_pre,
                          hq_pro: this.hq_pro
                        };
                        // console.log(comp2);
                        this.comp2 = JSON.stringify(comp2);
                        localStorage.setItem('comp2', this.comp2);
                        $('.helpers').hide();
                        $('.c-gig-divs').hide();
                        $('#c-gig-three').show();
                        $('html,body').animate({
                          scrollTop: $('#c-gig-three').offset().top - 150
                        });
            
                      } else{
                        $('#comp2-err').html('All fields must be filled and checked');
                      }
          break;
        case 'fourth':
          // console.log(this.check1);
        if (this.validateService.validateInput(this.doller1) && this.validateService.validateInput(this.days1) && this.validateService.validateInput(this.doller2) && this.validateService.validateInput(this.days2) && this.validateService.validateInput(this.que1) && this.validateService.validateInput(this.ans1) && this.validateService.validateInput(this.description2)){
          
                      const comp3 = {
                        check1: this.check1,
                        doller1: this.doller1,
                        days1: this.days1,
                        description2: this.description2,
                        doller2: this.doller2,
                        days2: this.days2,
                        que1: this.que1,
                        ans1: this.ans1
                      };
                      // console.log(this.check1);
                      
                      this.comp3 = JSON.stringify(comp3);
                      localStorage.setItem('comp3', this.comp3);
                     
          
                      $('.helpers').hide();
                        $('.c-gig-divs').hide();
                        $('#c-gig-four').show();
                        $('html,body').animate({
                          scrollTop: $('#c-gig-four').offset().top - 150
                        });
                    }else{
                        $('#comp3-err').html('All fields must be filled and checkboxes must be checked');
                    }
          break;
        case 'fifth':
        if (this.validateService.validateInput(this.img1) || this.validateService.validateInput(this.img2) || this.validateService.validateInput(this.img3)){
          
                        $('.helpers').hide();
                        $('.c-gig-divs').hide();
                        $('#c-gig-five').show();
                        $('html,body').animate({
                          scrollTop: $('#c-gig-five').offset().top - 150
                        });
                    }else{
                      $('#image-err').html('Atleast one image is required');
                    }
          break;
      
        default:
          break;
      }
      let u = localStorage.getItem('user');    
      let user = JSON.parse(u);

      this.user_id = user.id;
      // console.log(user_id +""+"main user Id");
      this.authService.getUser(this.user_id).subscribe(user => {
        let us = user.msg;
        this.first_name = us.first_name;
        this.last_name = us.last_name;
      })
  }

  handleChange(event){
    
          switch (event.target.value){
            case 'email':
            this.email = event.target.checked;
            // console.log(this.email);
            break;
            case 'profiles':
            this.profiles = event.target.checked;
            break;
            case 'sharing':
            this.sharing = event.target.checked;
            break;
            case 'socila-login':
            this.social_login = event.target.checked;
            break;
            case 'rating':
            this.rating = event.target.checked;
            break;
            case 'mobile':
            this.mobile = event.target.checked;
            break;
          }
      }
    images:any;
      fileChange1(event){
          this.images = event.target.files;  
          console.log(this.images); 
          this.img1 = this.images[0];
          this.img2 = this.images[1];
          this.img3 = this.images[2];
      }
    
      // fileChange2(event){
      //   this.img2 = event.target.files[0];
      //   // console.log(this.img2);
      // }
    
      // fileChange3(event){
      //   this.img3 = event.target.files[0];
      //   // console.log(this.img3);
      // }
    
    
    gig_id:any;
    first_name:string;
    last_name:string;
    
      savegig(){   
        
        let formData = new FormData();
          formData.append('user_id',this.user_id);
          formData.append('first_name',this.first_name);
          formData.append('last_name',this.last_name);
          formData.append('category',this.gig_category);
          formData.append('title',this.gig_title);
          formData.append('description',this.gig_description);
          formData.append('email',this.email.toString());
          formData.append('profiles',this.profiles.toString());
          formData.append('sharing',this.sharing.toString());
          formData.append('social_login',this.social_login.toString());
          formData.append('rating',this.rating.toString());
          formData.append('mobile',this.mobile.toString());
    
          formData.append('pac_cos_sta',this.pac_cos_sta);
          formData.append('pac_cos_pre',this.pac_cos_pre);
          formData.append('pac_cos_pro',this.pac_cos_pro);
          formData.append('pac_det_sta',this.pac_det_sta);
          formData.append('pac_det_pre',this.pac_det_pre);
          formData.append('pac_det_pro',this.pac_det_pro);
          formData.append('pac_del_sta',this.pac_del_sta);
          formData.append('pac_del_pre',this.pac_del_pre);
          formData.append('pac_del_pro',this.pac_del_pro);
          formData.append('rev_sta',this.rev_sta);
          formData.append('rev_pre',this.rev_pre);
          formData.append('rev_pro',this.rev_pro);
          formData.append('words_sta',this.words_sta);
          formData.append('words_pre',this.words_pre);
          formData.append('words_pro',this.words_pro);
          formData.append('sf_sta',this.sf_sta.toString());
          formData.append('sf_pre',this.sf_pre.toString());
          formData.append('sf_pro',this.sf_pro.toString());
          formData.append('hq_sta',this.sf_sta.toString());
          formData.append('hq_pre',this.hq_pre.toString());
          formData.append('hq_pro',this.hq_pro.toString());
    
          // formData.append('doller1',this.doller1);
          // formData.append('days1',this.days1);
          // formData.append('doller2',this.doller2);
          // formData.append('days2',this.days2);
          // formData.append('check1',this.check1);
          // formData.append('description2',this.description2);
          if(this.check1){
            let ext1 = {
              description:"I will deliver all work for an extra",
              days:this.days1,
              cost:this.doller1
            }
            this.extras.push(ext1);
          }
    
      
          let ext2 = {
            description:this.description2,
            days:this.days2,
            cost:this.doller2
          }
          this.extras.push(ext2);
          // console.log(this.extras);
          // formData.append('extras',this.extras.toString());
    
          formData.append('que1',this.que1);
          formData.append('ans1',this.ans1);
     
          formData.append('img1', this.img1),
          formData.append('img2', this.img2),
          formData.append('img3', this.img3);
            // console.log(formData.get('img3'));
        this.authService.auth_upload_gig(formData).subscribe(dat => {
          console.log(dat);
          if(dat.success == true){
            this.gig_id = dat.msg._id;
          let ext= {
            gig_id:this.gig_id,
            extrs:this.extras
          }
              
            this.gigService.post_gig_extrs(ext).subscribe(re => {
              console.log(re);
              if(re.success == true){
                 this.router.navigate(['/my-gigs'], { queryParams: {gig:"newgig"}});
              }
            })
          }
    
        })
    
          }
}
