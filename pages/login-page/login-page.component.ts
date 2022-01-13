import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { ValidatorService } from '../../../shared/services/validator.service';
import { ResponseAuth } from '../../shared/interfaces/Response-auth.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [    '../../shared/css/auth.css']
})
export class LoginPageComponent {
  private _form:FormGroup = this.formBuider.group({
    email:['test1@gmail.com', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ] ] ,
    password:['123456', Validators.required  ],
  } )

  private settingSnackBar:MatSnackBarConfig = {
    horizontalPosition: 'start',
    verticalPosition: 'bottom',
    duration:3000
  }

  constructor(
    private validatorService:ValidatorService,
    private formBuider:FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  get form(){
    return this._form
  }

  fieldInvalid(field:string){
    return this.form.get(field)?.invalid && this.form.get(field)?.touched
  }

  get emailError(){
    if(this.form.get('email')?.hasError('required')) return this.validatorService.MessageRequiredField('email')
    if(this.form.get('email')?.hasError('pattern')) return this.validatorService.MessageErrorEmail
    return ''
  }

  get passwordError(){
    if(this.form.get('password')?.hasError('required')) return this.validatorService.MessageRequiredField('contraseña')
    return
  }

  onSubmit(){
    this.form.markAllAsTouched()
    this.login()
  }

  login(){
    this.userService.login(this._form.value).subscribe(
      (resp:ResponseAuth) => { 
        this.snackBar.open( resp.message , 'Cerrar', this.settingSnackBar )
        this.router.navigate(['/producto'])
        localStorage.setItem('token', resp.token! )
       },
      (err:HttpErrorResponse)=> {
        this.snackBar.open(err.error.message, 'Cerrar', this.settingSnackBar )
      }
    )
  }

}
