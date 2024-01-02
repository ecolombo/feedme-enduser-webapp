import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm:FormGroup;
  public errorReponse:string="";
  public stReponse:string="";

  constructor(private authService: AuthService, private router:Router) { 
    this.registerForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password':  new FormControl(null,[Validators.required]),
      'fullName':  new FormControl(null,[Validators.required]),
      "loginType": new FormControl(1),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe( (response :any) =>{
        console.log(response);
        // this.router.navigateByUrl("/auth/login");
        this.stReponse = response.message;
        this.registerForm.reset();
      },error =>{
        this.errorReponse = error.error.message;
      })
    }else{
      this.errorReponse = "Enable to submit form, Invalid form data";
      console.log("Invalid Form");
    }
  }

}
