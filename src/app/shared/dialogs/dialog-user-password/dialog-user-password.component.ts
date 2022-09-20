import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonService, UserService } from '@core/services';
import { matchValidator } from 'src/app/core/helpers/confirmPassword.validator';

@Component({
  selector: 'vs-dialog-user-password',
  templateUrl: './dialog-user-password.component.html',
  styleUrls: ['./dialog-user-password.component.scss']
})
export class DialogUserPasswordComponent implements OnInit {
  validPass:boolean=true;
  title: string = 'Cambio de Contraseña';
  userForms: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(7)]),
    passwordNewVerify: new FormControl('', [Validators.required, Validators.minLength(7), matchValidator('newPassword')]),
  });
  loading: boolean=true;

  constructor(
    public dialogRef: MatDialogRef<DialogUserPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { personId: number},
    private userService:UserService,
  ) { }

  ngOnInit(): void {
  }

  update(){
    this.userService.updatePassword(this.data.personId,  this.userForms.value)
    .subscribe(resp=> this.dialogRef.close(true));
  }

  handleCancel(resp: boolean): void {
    this.dialogRef.close(resp);
  }
}
