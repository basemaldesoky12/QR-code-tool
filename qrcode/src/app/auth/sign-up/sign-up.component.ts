import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { matchPassword } from './matchpassword.validator';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm! : FormGroup
  errorMessage: string = '';
  errorUser : string =''
  errorUserBoolean : boolean = false
 constructor( private fb :FormBuilder, 
  private route : Router,
  private authService : AuthService){
    this.signupForm= this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[^\s]+$')]],
      email : ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),    Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{6,}$')
    ]],
      ConfirmPassword: ['', [Validators.required]],
    },{ validators: matchPassword })
  }

  ngOnInit(): void {
  }
  //  passwordMatchValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     const password = control.get('password');
  //     const confirmPassword = control.get('confirmPassword');
  
  //     if (!password || !confirmPassword) {
  //       return null;
  //     }
  
  //     return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  //   };
  // }
  signUp(){
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe(res=>{
        console.log(res)
        this.route.navigate(['auth','login'])
      },err=>{
        if(err.error=='This UserName is already exists')
        {
          this.errorUserBoolean = true
           this.errorUser='username already exists'
        }
        if(err.error=='This Email is already exists')
        {
          this.errorUserBoolean = true
           this.errorUser='Email already exists'
        }
        console.log(err)
      })
    }else{
      this.errorMessage="Invalid email or password. Please try again."
    }
  
  }
}
