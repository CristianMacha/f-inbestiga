import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserEffects } from './store/user.effects';
import { userFeatureKey, _userReducer } from './store/user.reducer';
import { SharedModule } from '../../shared/shared.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


@NgModule({
  declarations: [
    UserComponent,
    UserTableComponent,
    UserFormComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    StoreModule.forFeature(userFeatureKey, _userReducer),
    EffectsModule.forFeature([UserEffects]),
    SharedModule,
  ]
})
export class UserModule { }
