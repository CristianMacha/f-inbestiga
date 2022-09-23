import {Component, Input, OnInit} from '@angular/core';
import {Invoice} from "@core/models";

@Component({
  selector: 'vs-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  @Input() invoices: Invoice[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
