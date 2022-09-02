import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentModel} from "@core/models";
import {CPaymentStatus, EStorage} from "@core/enums";
import {MatDialog} from "@angular/material/dialog";
import {IDialogConfirm} from "@core/interfaces";
import {DialogConfirmComponent} from "../../dialogs/dialog-confirm/dialog-confirm.component";
import {PaymentService} from "@core/services";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {DialogPaymentUpdateComponent} from "../../dialogs/dialog-payment-update/dialog-payment-update.component";

@Component({
  selector: 'vs-fee-payment',
  templateUrl: './fee-payment.component.html',
  styleUrls: ['./fee-payment.component.scss']
})
export class FeePaymentComponent implements OnInit {
  @Output() updated = new EventEmitter<boolean>();
  @Input() payment!: PaymentModel;

  loading = false;
  loadingFile = false;
  paymentStatus = CPaymentStatus;

  constructor(
    private dialog: MatDialog,
    private paymentService: PaymentService,
    private storage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
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
      data: {payment: this.payment},
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
}
