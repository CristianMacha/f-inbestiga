import { Component, OnInit } from '@angular/core';

declare function loadInputs(): any;

@Component({
  selector: 'vs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  year = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
    loadInputs();
  }

}
