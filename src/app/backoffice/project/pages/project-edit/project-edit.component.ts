import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'vs-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
