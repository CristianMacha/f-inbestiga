import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserEffects } from './store/user.effects';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, _userReducer } from './store/user.reducer';



@NgModule({
  declarations: [
    UserComponent,
    UserTableComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(userFeatureKey, _userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule { }
