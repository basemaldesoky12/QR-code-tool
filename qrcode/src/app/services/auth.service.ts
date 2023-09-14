import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url ='http://minanicola-001-site1.atempurl.com'
  constructor(private http : HttpClient) { }
  signup(body :any)
  {
   return this.http.post(this.url+'/api/Account/register',body,{responseType : 'text'})
  }
  login(body : any){
    return this.http.post(this.url+'/api/Account/login',body,{responseType : 'text'})
  }
}
