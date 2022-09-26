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
  projectId:number=0;
  opciones:string="";
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogConfirm,
    @Inject(MAT_DIALOG_DATA) public datas:{ projectId: number },
    private projectService: ProjectService
  ) { }
  

  ngOnInit(): void {
    this.getProject(this.datas.projectId);
  }

  getProject(projectId: number): void {
    this.projectService.getProject(projectId, false)
      .subscribe(resp=>{
        if (resp.active) {
          this.opciones="Habilitar"
        }else{
          this.opciones="Deshabilitar"
        }
      });
  }

  handleBtnAction(): void {
    this.projectService.updateActive(this.datas.projectId).subscribe((resp) => resp.active)     
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
