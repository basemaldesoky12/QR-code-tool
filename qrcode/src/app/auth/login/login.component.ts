import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage : string =''
  loginError : boolean = false
  constructor(
    private fb: FormBuilder, 
      private route: Router,
      private authService : AuthService,
  ){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required ]]
  });
  }
  ngOnInit(): void {
  }
  login()
  {
    this.authService.login(this.loginForm.value).subscribe(res=>{
      let token = res
      localStorage.setItem('token',token)
      // console.log(res)
      this.route.navigate(['myqrcodes'])
    },err=>{
      console.log(err.status)
      console.log(err)
      if(err.status==401)
      {
          this.loginError=true
          this.errorMessage='please verify your account'
      }
      if(err.status==400)
      {
        this.loginError=true
          this.errorMessage='invalid email orr password'

      }
    })
  }
  handleChange()
  {
    this.errorMessage=''
  }
}
