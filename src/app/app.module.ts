import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './app.reducers';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import { registerLocaleData } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestapiInterceptor } from './core/interceptors/requestapi.interceptor';
import { UiEffects } from './shared/ui.effects';
import {MaterialModule} from "./material/material.module";

import localePE from '@angular/common/locales/es-PE';
import { MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
registerLocaleData(localePE, 'es');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([UiEffects]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestapiInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID, useValue: 'es'
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'es-ES'
    },
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'PEN'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
