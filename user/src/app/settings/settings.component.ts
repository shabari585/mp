import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Settings - Market Place');
    $("#s-ab-you").keydown(updateChar);
    $("#s-ab-you").keyup(updateChar);
    function updateChar() {
      var cl = $("#s-ab-you").val().length;
      $("#char-now").html(cl);
    }
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          // $('#change-p-p').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#c-p-p").change(function () {
      readURL(this);
    });
  }

}
