import {Component, Input, OnInit} from '@angular/core';

import {Invoice} from "@core/models";
import {CInvoiceStatus} from "../../../core/enums/invoice.enum";
import {ActivatedRoute, Router} from "@angular/router";
import { CFeeStatus } from '@core/enums';
import { FeeService } from '@core/services';

@Component({
  selector: 'vs-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  @Input() invoice: Invoice = new Invoice();
  @Input() showDetail: boolean = false;

  cInvoiceStatus = CInvoiceStatus;
  cFeeStatus = CFeeStatus;
  countOut:number=0;
  constructor(
    private router: Router,
    private feeService:FeeService,
  ) {
  }

  ngOnInit(): void {
      this.addFeePaidOut(this.invoice.id)
  }

  handleViewDetails(): void {
    this.router.navigateByUrl(`backoffice/pagos/${this.invoice.id}`);
  }


  addFeePaidOut(invoiceId: number): void {
    this.feeService.getByInvoice(invoiceId)
      .subscribe((resp) => {
        resp.forEach(feed=>{
          if (feed.status==CFeeStatus.PAID_OUT) {
            this.countOut +=1;
          }
        })
      });
  }
}
