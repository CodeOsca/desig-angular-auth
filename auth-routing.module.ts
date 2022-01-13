import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MainPageComponent } from './pages/main-page/main-page.component';
import { KeyPageComponent } from './pages/key-page/key-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';


const routes: Routes = [
  {
    path:'',
    component: MainPageComponent,
    children:[
      { path:'', component: KeyPageComponent },
      { path:'ingresar', component: LoginPageComponent },
      { path:'registro', component: RegisterPageComponent },
      { path:'**', redirectTo:'', pathMatch:'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
