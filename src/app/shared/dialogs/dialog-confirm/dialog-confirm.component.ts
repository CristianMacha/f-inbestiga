import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ActivatedRoute } from '@angular/router';
import {IDialogConfirm} from "@core/interfaces";
import { ProjectService } from '@core/services';

@Component({
  selector: 'vs-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogConfirm,
  ) { }
  

  ngOnInit(): void {
  }

  handleBtnAction(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
