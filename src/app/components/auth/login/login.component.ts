import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;
  public errorReponse:string="";

  constructor(private authService: AuthService, private router:Router) { 
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password':  new FormControl(null,[Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe( (response :any) =>{
        console.log(response);
        localStorage.setItem('x-auth-token', JSON.stringify(response?.data?.authToken));
        localStorage.setItem('x-admin-id', JSON.stringify(response?.data?.adminId));
        localStorage.setItem('x-admin-name', JSON.stringify(response?.data?.fullName));
        this.router.navigateByUrl("/browse/categories");
      },error =>{
        this.errorReponse = error.error.message;
      })
    }else{
      this.errorReponse = "Enable to submit form, Invalid form data";
      console.log("Invalid Form");
    }
  }
}
