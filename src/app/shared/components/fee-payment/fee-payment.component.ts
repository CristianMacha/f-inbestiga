import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { finalize } from "rxjs";
import { Fee, PaymentModel, Role } from "@core/models";
import { CPaymentStatus, CRole, EFeeStatus, EStorage } from "@core/enums";
import { IDialogConfirm } from "@core/interfaces";
import { DialogConfirmComponent } from "../../dialogs/dialog-confirm/dialog-confirm.component";
import { PaymentService } from "@core/services";
import { DialogPaymentUpdateComponent } from "../../dialogs/dialog-payment-update/dialog-payment-update.component";
import { appState } from "../../../app.reducers";
import { uiRoleSelected } from "../../ui.selectors";

@Component({
  selector: 'vs-fee-payment',
  templateUrl: './fee-payment.component.html',
  styleUrls: ['./fee-payment.component.scss']
})
export class FeePaymentComponent implements OnInit {
  @Output() updated = new EventEmitter<boolean>();
  @Input() payment!: PaymentModel;
  @Input() fee!: Fee;

  loading = false;
  loadingFile = false;
  paymentStatus = CPaymentStatus;
  cRole = CRole;
  eFeeStatus=EFeeStatus;
  roleSelected = new Role();

  constructor(
    private dialog: MatDialog,
    private paymentService: PaymentService,
    private storage: AngularFireStorage,
    private store: Store<appState>,
  ) {
  }

  ngOnInit(): void {
    this.getRoleSelected();
  }

  handleVerify(): void {
    const dialogData: IDialogConfirm = {
      accept: true,
      title: 'Verificar Pago',
      action: 'Verficar',
      description: ''
    }

    this.openDialog(dialogData);
  }

  handleRefuse(): void {
    const dialogData: IDialogConfirm = {
      accept: false,
      title: 'Rechazar pago',
      action: 'Rechazar',
      description: '',
    }

    this.openDialog(dialogData);
  }

  openDialog(data: IDialogConfirm): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((resp) => (resp) && this.approvePayment(data.accept));
  }

  approvePayment(approve: boolean): void {
    this.loading = true;
    this.paymentService.approvePaymentFee(this.payment.id, approve)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.updated.emit(true));
  }

  openFile(): void {
    this.loadingFile = true;
    const ref = this.storage.ref(`${EStorage.REF_VOUCHER}/${this.payment.code}`);
    ref.getDownloadURL().subscribe({
      next: (url) => (window.open(url, '_blank')),
      complete: () => this.loadingFile = false,
    });
  }

  handleEdit(): void {
    const dialogRef = this.dialog.open(DialogPaymentUpdateComponent, {
      width: '500px',
      data: { payment: this.payment },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((resp) => resp && this.updatePayment(resp))
  }

  updatePayment(amount: number): void {
    this.loading = true;
    this.payment.amount = amount;
    this.paymentService.update(this.payment.id, this.payment)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.updated.emit(true))
  }

  getRoleSelected(): void {
    this.store.select(uiRoleSelected).subscribe((role) => {
      if (role.id) {
        this.roleSelected = role;
      }
    })
  }
}
