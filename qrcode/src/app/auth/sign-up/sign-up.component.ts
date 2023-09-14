import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm! : FormGroup
  errorMessage: string = '';
 constructor( private fb :FormBuilder, 
  private route : Router,
  private authService : AuthService){
    this.signupForm= this.fb.group({
      username: ['', Validators.required],
      email : ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required]],
    },{ validators: this.passwordMatchValidator() })
  }

  ngOnInit(): void {
  }
   passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
  
      if (!password || !confirmPassword) {
        return null;
      }
  
      return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    };
  }
  signUp(){
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe(res=>{
        console.log(res)
        this.route.navigate(['auth','login'])
      },err=>{
        console.log(err)
      })
    }else{
      this.errorMessage="Invalid email or password. Please try again."
    }
  
  }
}
