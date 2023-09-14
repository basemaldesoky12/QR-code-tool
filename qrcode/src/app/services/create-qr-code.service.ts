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
  createQrCode(body : any)
  {
     
    return this.http.post(this.URL+'/api/QRCode',body,{responseType:'text'})
  }
  getAllQrCodes()
  {
    return this.http.get(this.URL+'/api/QRCode')
  }
  scanQR(country : string, deviceType : string, id: number, browser : string)
  {
    const requestBody = {
      Country : country,
      DeviceType : deviceType,
      QRCodeID : id,
      Browser : browser
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
  editName(body:any,id:any)
  {
    return this.http.put(this.URL+`/api/QRCode/${id}`,body,{responseType : 'text'})
  }
}
