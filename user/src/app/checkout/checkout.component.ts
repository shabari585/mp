import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private title: Title) { }

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
  }

}
