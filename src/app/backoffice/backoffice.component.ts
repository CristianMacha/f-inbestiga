import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'vs-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnInit(): void {
    let backofficeComponent = this._document.getElementById('backoffice-main');

    let materialDashboardJs = this._renderer2.createElement('script');
    materialDashboardJs.type = 'application/javascript';
    materialDashboardJs.src = '../../assets/js/material-dashboard.min.js?v=3.0.4';
    this._renderer2.appendChild(backofficeComponent, materialDashboardJs);
  }

}
