import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {FeeService} from "@core/services";
import {Fee} from "@core/models";

@Component({
  selector: 'vs-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {
  @Input() invoiceId: number = 0;

  fees: Fee[] = [];

  constructor(
    public dialog: MatDialog,
    private feeService: FeeService,
  ) {
  }

  ngOnInit(): void {
    this.getFees();
  }

  getFees(): void {
    this.feeService.getByInvoice(this.invoiceId)
      .subscribe((resp) => this.fees = resp);
  }

}
