import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@core/services';
import { finalize } from 'rxjs';
import { matchValidator } from '../../../../app/core/helpers/confirmPassword.validator';

@Component({
  selector: 'vs-dialog-user-password',
  templateUrl: './dialog-user-password.component.html',
  styleUrls: ['./dialog-user-password.component.scss']
})
export class DialogUserPasswordComponent implements OnInit {
  userForms: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(7)]),
    passwordNewVerify: new FormControl('', [Validators.required, Validators.minLength(7), matchValidator('newPassword')]),
  });

  loading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogUserPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { personId: number },
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  update() {
    this.loading = true;
    this.userService.updatePassword(this.data.personId, this.userForms.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe(resp => this.dialogRef.close(true));
  }

  handleCancel(resp: boolean): void {
    this.dialogRef.close(resp);
  }
}
