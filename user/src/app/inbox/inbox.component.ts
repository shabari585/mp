import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Inbox - Market Place');


    // $("#create-project-btn").click(function () {
    //   window.location.href = "create-gig.php";
    // });
    // $("#reply").keypress(function (e) {
    //   var key = e.which;
    //   if (key == 13) {
    //     if ($.trim($("#reply").val()) == '') {
    //       //$("#reply").val("");
    //     } else {
    //       sendMessage();
    //     }
    //   }
    // });
    // $(document).on("click", ".contact", function (e) {
    //   e.preventDefault();
    //   var uid = $(this).find(".cid").text();
    //   var cid = $(this).find(".conid").text();
    //   $(".messages-div").load("redundant/message-core.php?u=" + uid + "&c=" + cid);
    //   //alert('uid');
    // });
  }

}
