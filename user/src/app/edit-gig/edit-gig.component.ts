import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService} from '../services/auth.service';
import { ValidateService} from '../services/validate.service';
import { GigService } from "../services/gig.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-edit-gig',
  templateUrl: './edit-gig.component.html',
  styleUrls: ['./edit-gig.component.css','../create-gig/create-gig.component.css']
})
export class EditGigComponent implements OnInit {

  constructor(private title: Title,private authService: AuthService , private validateService: ValidateService , private router:Router, private gigService:GigService,private activateRoute:ActivatedRoute) { }

  tabOneCheck = false;
  tabTwoCheck = false;
  tabThreeCheck = false;
  tabFourCheck = false;

// comp1
user_id:string;
  gig_category: string;
  gig_title: string;
  gig_description: string;
  comp1: string;
  email:boolean=false;
  profiles= false;
  sharing= false;
  social_login:boolean= false;
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

gig_id:string;

email_s:boolean;
profiles_s:boolean;
sharing_s:boolean;
social_login_s:boolean;
rating_s:boolean;
mobile_s:boolean;

first_name:string;
last_name:string;
extra1_id:string;
extra2_id:string;
extras = [];
  ngOnInit() {
    this.title.setTitle('Edit Gig - Market Place');

    // Close button
    $(".trl").click(function () {
      location.reload();
    });
     //  Panel one
    // Helpers
    $('#c-gig-cat').focus(function () {
      $('.helpers').hide();
      $('#cat-helper').toggle();
      // $('html,body').animate({scrollTop:$('#c-gig-one').offset().top});
    });
    $('#c-gig-cat').hover(function () {
      $('.helpers').hide();
      $('#cat-helper').toggle();
    });
    $('#title').focus(function () {
      $('.helpers').hide();
      $('#title-helper').toggle();
      $('html,body').animate({
        scrollTop: $('#c-gig-cat').offset().top - 80
      });
    });
    $('#title').hover(function () {
      $('.helpers').hide();
      $('#title-helper').toggle();
    });
    $('#title').keydown(function () {
      $('.helpers').hide();
      $('#title-helper').toggle();
    });
    $('.mce-container').focus(function () {
      $('.helpers').hide();
      $('#desc-helper').toggle();
    });
    $('.mce-container').hover(function () {
      $('.helpers').hide();
      $('#desc-helper').toggle();
    });
    $('.mce-container').keydown(function () {
      $('.helpers').hide();
      $('#desc-helper').toggle();
    });
    $('#skills-req-table').hover(function () {
      $('.helpers').hide();
      $('#skills-helper').toggle();
    });
      this.gig_id = this.activateRoute.queryParams['_value'].id;
      // this.gig_id = "5a169f3f9f9b290368e0c082";
      // console.log(this.gig_id);
    this.gigService.get_gig_byId(this.gig_id).subscribe(gig => {
      console.log(gig);
      let g = gig.msg;
      this.gig_category = g.category;
      this.gig_title = g.title;
      this.gig_description=g.description;
    
      this.email= g.email;
      this.profiles= g.profiles;
      this.sharing= g.sharing;
      this.social_login= g.social_login;
      this.rating= g.rating;
      this.mobile= g.mobile;
    this.pac_cos_sta = g.pac_cos_sta;
    this.pac_cos_pre = g.pac_cos_pre;
    this.pac_cos_pro = g.pac_cos_pro;
    this.pac_det_sta = g.pac_det_sta;
    this.pac_det_pre = g.pac_det_pre;
    this.pac_det_pro = g.pac_det_pro;
    this.pac_del_sta = g.pac_del_sta;
    this.pac_del_pre = g.pac_del_pre;
    this.pac_del_pro = g.pac_del_pro;
    this.rev_sta = g.rev_sta;
    this.rev_pre = g.rev_pre;
    this.rev_pro = g.rev_pro;
    this.words_sta = g.words_sta;
    this.words_pre = g.words_pre;
    this.words_pro = g.words_pro;
    this.sf_sta = g.sf_sta;
    this.sf_pre= g.sf_pre;
    this.sf_pro= g.sf_pro;
    this.hq_sta= g.hq_sta;
    this.hq_pre= g.hq_pre;
    this.hq_pro= g.hq_pro;
       
    this.que1 = g.que1;
    this.ans1 = g.ans1;

    this.img1 = g.img1;
    this.img2 = g.img2;
    this.img3 = g.img3;
    });
    this.gigService.get_gig_extrs(this.gig_id).subscribe(gig_ext => {
      console.log(gig_ext);
      let ext = gig_ext.msg;

      for(let i=0;i<ext.length;i++){
        if(ext[i].e_description == "I will deliver all work for an extra"){
            this.check1 =true;
            this.doller1 = ext[i].price;
            this.days1 = ext[i].days;
        }
       else{
          this.doller2 = ext[i].price;
          this.days2 = ext[i].days;
          this.description2 = ext[i].e_description;
        }
      }
      
    })

    // Body Scroll

    // Navigation button
    $('.one-nav-btn').click(function () {
      $('.helpers').hide();
      $('.c-gig-divs').hide();
      $('#c-gig-one').show();
      $('html,body').animate({
        scrollTop: $('#c-gig-one').offset().top - 150
      });
    });
    $('.two-nav-btn').click(function () {
      $('.helpers').hide();
      $('.c-gig-divs').hide();
      $('#c-gig-two').show();
      $('html,body').animate({
        scrollTop: $('#c-gig-two').offset().top - 150
      });
    });
    $('.three-nav-btn').click(function () {
      $('.helpers').hide();
      $('.c-gig-divs').hide();
      $('#c-gig-three').show();
      $('html,body').animate({
        scrollTop: $('#c-gig-three').offset().top - 150
      });
    });
    $('.four-nav-btn').click(function () {
      $('.helpers').hide();
      $('.c-gig-divs').hide();
      $('#c-gig-four').show();
      $('html,body').animate({
        scrollTop: $('#c-gig-four').offset().top - 150
      });
    });
    // Validations


  }

  gotoNexttab(gotoTab) {
      switch (gotoTab) {
        case 'first':
          $('.helpers').hide();
          $('.c-gig-divs').hide();
          $('#c-gig-one').show();
          $('html,body').animate({
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

fileChange1(event){
this.img1 = event.target.files[0];

}

fileChange2(event){
this.img2 = event.target.files[0];
// console.log(this.img2);
}

fileChange3(event){
this.img3 = event.target.files[0];
// console.log(this.img3);
}

// gig_id:any;

extrasid=[];
checked:boolean;
savegig(){ 

let formData = new FormData();
  formData.append('user_id',this.user_id);
  formData.append('gig_id',this.gig_id);
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

  if(this.checked || this.check1){

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
    console.log(this.extras);

  formData.append('que1',this.que1);
  formData.append('ans1',this.ans1);

  formData.append('img1', this.img1),
  formData.append('img2', this.img2),
  formData.append('img3', this.img3);

this.gigService.update_gig(formData).subscribe(dat => {
          console.log(dat);
    if(dat.success == true){
      this.gig_id = dat.msg._id;
      
    let ext= {
      gig_id:this.gig_id,
      extrs:this.extras
    }        
    this.gigService.update_gig_extrs(ext).subscribe(re => {
      console.log(re)
        if(re.success == true){
          // this.router.navigate(['/gig'], { queryParams: {id:this.gig_id}});
        }
      })
    }
  })
}
}
