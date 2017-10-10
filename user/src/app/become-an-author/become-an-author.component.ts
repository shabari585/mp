import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-become-an-author',
  templateUrl: './become-an-author.component.html',
  styleUrls: ['./become-an-author.component.css']
})
export class BecomeAnAuthorComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Become an Author - Market Place');
  }

}
