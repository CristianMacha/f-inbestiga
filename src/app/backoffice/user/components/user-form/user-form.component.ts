import { Component, OnInit } from '@angular/core';

declare function loadInputs(): any;

@Component({
  selector: 'vs-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    loadInputs();
  }

}
