import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vs-dialog-payment-methods',
  templateUrl: './dialog-payment-methods.component.html',
  styleUrls: ['./dialog-payment-methods.component.scss']
})
export class DialogPaymentMethodsComponent implements OnInit {
  interbankSoles = '5003004188829';
  interbankDolares = '5003004188836';
  bcpSoles = '3559862526030';
  bbvaSoles = '001102350201838132';
  yape = '926708058';
  plin = '948780668';

  constructor() { }

  ngOnInit(): void {
  }

}
