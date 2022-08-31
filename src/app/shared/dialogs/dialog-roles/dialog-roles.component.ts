import {Component, Inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {appState} from "../../../app.reducers";
import {logout} from "../../ui.actions";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDialogVerifyPayment} from "@core/interfaces";
import {PersonRoles} from "@core/models";

@Component({
  selector: 'vs-dialog-roles',
  templateUrl: './dialog-roles.component.html',
  styleUrls: ['./dialog-roles.component.scss']
})
export class DialogRolesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { personRoles: PersonRoles[] },
    private store: Store<appState>,
  ) {
  }

  ngOnInit(): void {
  }

  selectRole(personRole: PersonRoles): void {
    this.dialogRef.close(personRole);
  }

  handleCancel(): void {
    this.store.dispatch(logout());
    this.dialogRef.close();
  }

}
