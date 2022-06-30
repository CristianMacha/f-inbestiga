import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../app.reducers';
import { unsetUser } from '../shared/ui.actions';

@Component({
  selector: 'vs-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit, OnDestroy {

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private store: Store<appState>,
  ) { }

  ngOnInit(): void {
    let backofficeComponent = this._document.getElementById('backoffice-main');

    let materialDashboardJs = this._renderer2.createElement('script');
    materialDashboardJs.type = 'application/javascript';
    materialDashboardJs.id = 'backoffice-main-scrip';
    materialDashboardJs.src = '../../assets/js/material-dashboard.js';
    this._renderer2.appendChild(backofficeComponent, materialDashboardJs);
  }

  ngOnDestroy(): void {
    document.getElementById('backoffice-main-scrip')?.remove();
   }

   logout() {
    this.store.dispatch(unsetUser());
   }

}
