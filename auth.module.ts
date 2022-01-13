import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { KeyPageComponent } from './pages/key-page/key-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';


@NgModule({
  declarations: [
    KeyPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
