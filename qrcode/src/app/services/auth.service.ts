import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url ='http://minanicola-001-site1.atempurl.com'
  helper = new JwtHelperService();
  constructor(private http : HttpClient) { }
  signup(body :any)
  {
   return this.http.post(this.url+'/api/Account/register',body,{responseType : 'text'})
  }
  login(body : any){
    return this.http.post(this.url+'/api/Account/login',body,{responseType : 'text'})
  }
  loggedIn() : boolean 
  {
    const token = localStorage.getItem('token')! 
    return !this.helper.isTokenExpired(token)
  }
  logout()
  {
    localStorage.removeItem('token');
  }
  removeFromLocalStorage()
  {
    if(this.loggedIn()==false)
    {
        localStorage.removeItem('token');
    }
  }

}
