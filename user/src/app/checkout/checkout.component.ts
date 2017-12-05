import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";

declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private title: Title,private router:Router,private activatedRoute:ActivatedRoute,private authService:AuthService,private gigService:GigService) { }

  gig_id:string;
  buyer_id:string;
  seller_id:string;
  buyer_fname:string;
  buyer_lname:string;
  seller_fname:string;
  seller_lname:string;
  pack:string;
  
  pac_cos_sta:string;
  gig_title:string;
  img1:string;
  sta_price:any;
  pre_price:any;
  pro_price:any;
  pac_del_sta:string;
  pac_del_pre:string;
  pac_del_pro:string;
  assigned_days:string;
  selected_price:any;
  description:string;
  ext_arr=[];
  ext_arr_all;
  selected_extras=[];
  ext_num:number;
  ext_name:string;
  finalvalue:any;
  checked:boolean;
  cur_extras = {};
  cur_ext_obj={};
  total_ext_days:number;
  total_amount:number;
  seller_img:string;
  buyer_img:string;
  ngOnInit() {
    this.title.setTitle('Checkout - Market Place');

    // $(function () {
    //   $('.rrating').barrating({
    //     theme: 'css-stars',
    //     initialRating: null,
    //     readonly: true
    //   });
    // });

    // $(".extra-checks").click(function () {
    //   if ($(this).is(":checked")) {
    //     $(this).parent().parent().parent().parent().find('.be-cost').addClass('cost');
    //     var ch = parseFloat($(this).parent().parent().parent().parent().find('.price-num').text());
    //     //var tot = parseFloat($('#total_price').text());
    //     var totn = $('#total_price').text();
    //     var tot = parseFloat(totn.substring(1));
    //     var n_tot = ch + tot;
    //     $("#total_price").html('$' + n_tot);
    //     $("#total-cost-input").val(n_tot);
    //   }
    //   else if (!($(this).is(":checked"))) {
    //     $(this).parent().parent().parent().parent().find('.be-cost').removeClass('cost');
    //     var ch = parseFloat($(this).parent().parent().parent().parent().find('.price-num').text());
    //     //var tot = parseFloat($('#total_price').text());
    //     var totn = $('#total_price').text();
    //     var tot = parseFloat(totn.substring(1));
    //     var n_tot = tot - ch;
    //     $("#total_price").html('$' + n_tot);
    //     $("#total-cost-input").val(n_tot);
    //   }
    // });

    this.gig_id = this.activatedRoute.queryParams['_value'].gig_id;
    // this.seller_id = this.activatedRoute.queryParams['_value'].user_id;
    this.pack = localStorage.getItem('selected_package');

    this.authService.get_gig_det(this.gig_id).subscribe(dat => {
      console.log(dat);
      let g = dat.msg;
      this.sta_price= g.pac_cos_sta;
      this.pre_price= g.pac_cos_pre;
      this.pro_price= g.pac_cos_pro;
      this.pac_del_sta = g.pac_del_sta;
      this.pac_del_pre = g.pac_del_pre;
      this.pac_del_pro = g.pac_del_pro;
      this.gig_title = g.title;
      this.seller_id = g.user_id;
      this.img1 = g.img1.replace('public','');
      this.seller_img = g.img1;
      this.description = g.description;
     console.log(this.pack);
        switch (this.pack) {
          case "standard":
            this.selected_price = this.sta_price;
            this.assigned_days = this.pac_del_sta;
            break;
            case "premium":
            this.selected_price = this.pre_price;
            this.assigned_days = this.pac_del_pre;
            break;
            case "pro":
            this.selected_price = this.pro_price;
            this.assigned_days = this.pac_del_pro;
            break;
        
          default:
            break;
        }      
        this.finalvalue = this.selected_price;
        // console.log(this.finalvalue);
        this.authService.getUser(this.seller_id).subscribe(seller => {
      let s = seller.msg;
      this.seller_fname = s.first_name;
      this.seller_lname = s.last_name;
      // console.log(seller);
    })
      });
    this.gigService.get_gig_extrs(this.gig_id).subscribe(ext => {
      this.ext_arr_all = ext.msg;
      console.log(this.ext_arr_all);
      this.ext_arr = JSON.parse(localStorage.getItem('extras'));
      console.log(this.ext_arr);
      this.total_ext_days = 0;   
      for (var i = 0; i <this.ext_arr_all.length; i++) {
        // alert("hii");
        var element = this.ext_arr_all[i]._id;
        console.log(this.ext_arr[element]);
        if(element == this.ext_arr[element]){

          this.selected_extras.push(this.ext_arr_all[i]);

          this.finalvalue = parseInt(this.finalvalue)+parseInt(this.ext_arr_all[i].price);
          this.total_amount = this.finalvalue + (this.finalvalue/100)*5;

          this.cur_extras[this.ext_arr_all[i]._id] = { extra_id: this.ext_arr_all[i]._id, 
            description: this.ext_arr_all[i].e_description, 
            price: this.ext_arr_all[i].price, 
            days: this.ext_arr_all[i].days };
            
        }
        
        this.total_ext_days =  this.total_ext_days + parseInt(this.cur_extras[this.ext_arr_all[i]._id].days);             
      }
     console.log(this.total_ext_days);
     
    })
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.buyer_id = u.id;
    this.authService.getUser(this.buyer_id).subscribe(buyer => {
      let u = buyer.msg;
      this.buyer_fname = u.first_name;
      this.buyer_lname = u.last_name;
      this.buyer_img = u.profile_pic;
      // console.log(buyer);
    })
  }

  onchange(event){
    
          switch (event.target.checked) {
            case false:          
             
              switch (event.target.value) {
                case this.selected_extras[0]._id:
                  this.finalvalue = parseInt(this.finalvalue) - parseInt(this.selected_extras[0].price);              this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                  break;
                  case this.selected_extras[1]._id:
                  this.finalvalue = parseInt(this.finalvalue) - parseInt(this.selected_extras[1].price);
                  this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                  break;
              
                default:
                  break;                            
              }         
              this.total_ext_days = this.total_ext_days - parseInt(this.cur_extras[event.target.value].days);               
              console.log(this.total_ext_days);
              this.cur_extras[event.target.value]="null";
              console.log(this.cur_extras);
              break;
            case true:
            // this.total_ext_days = 0;     
            for (var i = 0; i <this.ext_arr_all.length; i++) {
              var element = this.ext_arr_all[i]._id;
              if(event.target.value == element){
                this.cur_extras[this.ext_arr_all[i]._id] = { extra_id: this.ext_arr_all[i]._id, 
                  description: this.ext_arr_all[i].e_description, 
                  price: this.ext_arr_all[i].price, 
                  days: this.ext_arr_all[i].days };
              }           
            }
            this.total_ext_days = this.total_ext_days + parseInt(this.cur_extras[event.target.value].days);      
            // console.log(this.cur_extras);
            // console.log(this.total_ext_days);
            switch (event.target.value) {
              case this.selected_extras[0]._id:
                this.finalvalue = parseInt(this.finalvalue) + parseInt(this.selected_extras[0].price);
                this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                break;
                case this.selected_extras[1]._id:
                this.finalvalue = parseInt(this.finalvalue) + parseInt(this.selected_extras[1].price);
                this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                break;
            
              default:
                break;
            }
              break;      
            default:
              break;          
          }

      }
     
      resume:any;
      order_description:string;
    
      filechange(event){
        this.resume = event.target.files[0];
      }
        
      tot_ext_cost={};
      placeOrder(){
        
        let formData = new FormData();
        formData.append('resume',this.resume);
        formData.append('selected_pac',this.pack);
        formData.append('selected_price',this.selected_price);
        formData.append('assigned_days',this.assigned_days);
        formData.append('total_amount',JSON.stringify(this.total_amount));
        formData.append('total_ext_days',JSON.stringify(this.total_ext_days));
        formData.append('buyer_fname',this.buyer_fname);
        formData.append('buyer_lname',this.buyer_lname);
        formData.append('seller_fname',this.seller_fname);
        formData.append('seller_lname',this.seller_lname);
        formData.append('order_description',this.order_description);
        formData.append('gig_id',this.gig_id);
        formData.append('buyer_id',this.buyer_id);
        formData.append('seller_id',this.seller_id);
        formData.append('extras',JSON.stringify(this.cur_extras));
          
    console.log(JSON.stringify(this.cur_extras));
        this.gigService.post_order_det(formData).subscribe(order => {
          console.log(order);
            let or = order.msg;
             let order_id = order.msg._id;
          if(order.success){

              let new_not_s = {
                user_id:or.seller_id,
                message:"your gig has has been purchased by"+ or.buyer_fname+or.buyer_lname,
                date:or.date,
                status:"not_seen",
                image:this.buyer_img,
                link:"order-details?id="+order_id
              }
              this.gigService.post_notification(new_not_s).subscribe(not_s =>{
                console.log(not_s);
              })

              let new_not_b = {
                user_id:or.buyer_id,
                message:"You have purchased a new Gig",
                date:or.date,
                image:this.seller_img,
                status:"not_seen",
                link:"order-details?id="+order_id
              }
              this.gigService.post_notification(new_not_b).subscribe(not_b => {
                console.log(not_b)
              })
              console.log(new_not_b);
              localStorage.removeItem('extras');
              this.router.navigate(['/order-details'],{queryParams:{order_id:order_id}});
          }
        })    
    }
}
