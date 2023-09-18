import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url ='http://minanicola-001-site1.atempurl.com'
  helper = new JwtHelperService();
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();
  constructor(private http : HttpClient) { 
    this.loggedInSubject.next(this.isLoggedIn());
  }
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
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
}

  logout()
  {
    localStorage.removeItem('token');
    this.setLoggedIn(false);
  }
  removeFromLocalStorage()
  {
    if(this.loggedIn()==false)
    {
        localStorage.removeItem('token');
    }
  }
  setLoggedIn(value: boolean) {
    if (value) {
        localStorage.setItem('isLoggedIn', 'true');
    } else {
        localStorage.removeItem('isLoggedIn');
    }
    this.loggedInSubject.next(value);
}


}
