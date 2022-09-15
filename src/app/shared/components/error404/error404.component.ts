import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vs-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {
  year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
