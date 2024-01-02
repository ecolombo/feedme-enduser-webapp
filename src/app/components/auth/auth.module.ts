import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
//import { ForgetPasswordComponent } from './forget-password/forget-password.comp
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
//    ,ForgetPasswordComponent,
//    RegisterComponent,
  ],
  imports: [
    CommonModule,ReactiveFormsModule, FormsModule
  ]
})
export class AuthModule { }
