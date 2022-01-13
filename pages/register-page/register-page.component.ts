import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { ValidatorService } from '../../../shared/services/validator.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: [
    './register-page.component.css',
    '../../shared/css/auth.css'
  ]
})
export class RegisterPageComponent {
  private _form:FormGroup = this.formBuider.group({
    name:['Oscar José', [ Validators.required ] ],
    email:['test1@gmail.com', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ] ] ,
    password:['123456', [ Validators.required, Validators.minLength(6) ] ],
    passwordConfirm:['123456', Validators.required ]
  }, { validators:[ this.validatorService.fieldEquals('password','passwordConfirm') ] } )

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

  get nameError(){
    return this.form.get('name')?.hasError('required') ? this.validatorService.MessageRequiredField('nombre') : ''
  }

  get emailError(){
    if(this.form.get('email')?.hasError('required')) return this.validatorService.MessageRequiredField('email')
    if(this.form.get('email')?.hasError('pattern')) return this.validatorService.MessageErrorEmail
    return ''
  }

  get passwordError(){
    if(this.form.get('password')?.hasError('required')) return this.validatorService.MessageRequiredField('contraseña')
    if(this.form.get('password')?.hasError('minlength')) return this.validatorService.MinErrorLength
    return
  }

  passwordConfirmError(){
    return this.form.get('passwordConfirm')?.hasError('noIguales') ? this.validatorService.passwordsEquals :''
  }

  onSubmit(){
    this.form.markAllAsTouched()
    this.createUser()
  }

  createUser(){
    this.userService.create(this._form.value).subscribe(
      resp => { 
        this.snackBar.open( resp.message , 'Cerrar', this.settingSnackBar )
        this.router.navigate(['/auth/ingresar'])
       },
      (err:HttpErrorResponse)=> {
        this.snackBar.open(err.error.message, 'Cerrar', this.settingSnackBar )
      }
    )
  }
}
