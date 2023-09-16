import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CreateQrCodeService {
 URL= 'http://minanicola-001-site1.atempurl.com'
 private apiUrl = 'http://ip-api.com/json';
//  headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
  constructor(private http : HttpClient) { }
  createQrCode(body : any, token : any, nameidentifier  :any)
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    })    
    const formvalue = body
    formvalue.UserId = nameidentifier
    const requestBody = {
      body,
      UserId: nameidentifier
    };
    console.log(formvalue.UserId);
    
    console.log(requestBody)
    return this.http.post(this.URL+'/api/QRCode',formvalue,{responseType:'text', headers : headers})
  }
  getAllQrCodes()
  {
    return this.http.get(this.URL+'/api/QRCode')
  }
  scanQR(country : string, deviceType : string, id: number, browser : string, hashValue : any)
  {
    const requestBody = {
      Country : country,
      DeviceType : deviceType,
      QRCodeID : id,
      Browser : browser,
      HashValue : hashValue
    };
   return this.http.post(`http://minanicola-001-site1.atempurl.com/api/scan`,requestBody, {responseType : 'text'})
  }
  getUserCountry() {
    return this.http.get(this.apiUrl);
  }
  qrcodeDetails(id : any)
  {
    return this.http.get(this.URL+`/api/QRCode/${id}`)
  }
  editName(body:any,id:any, token : any, userId : any)
  {
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    })    
    const requestBody =  body
    requestBody.UserId = userId
    return this.http.put(this.URL+`/api/QRCode/${id}`,requestBody,{responseType : 'text', headers : headers})
  }
  deleteQrCode(qrId : any, token : any, userid : any)
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      })    
      const userId = Number(userid)
      console.log(userid)
   return this.http.delete(this.URL+`/api/QRCode/${qrId}`,{responseType : 'text', headers : headers , body : Number(userid)})
  }
}
