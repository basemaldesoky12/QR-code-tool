import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateQrCodeService } from 'src/app/services/create-qr-code.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-form-input-page',
  templateUrl: './form-input-page.component.html',
  styleUrls: ['./form-input-page.component.css']
})
export class FormInputPageComponent implements OnInit {
 qrCodeForm !: FormGroup
 helper = new JwtHelperService();
  constructor(private route :Router, 
    private fb : FormBuilder,
    private createQR : CreateQrCodeService
    ){
      this.qrCodeForm = this.fb.group({
        URLValue: ['', [
          Validators.required, // Required validation
          Validators.pattern('^(https?|ftp)://[\\w\\.-]+\\.[a-zA-Z]{2,4}(:\\d+)?(/\\S*)?$') // URL pattern validation
        ]],
        QRName: ['',[Validators.required, Validators.minLength(3)]]
      });
    }
  ngOnInit(): void {
  }
  generate()
{
  let token = localStorage.getItem('token')!
  const decodedToken: any = jwtDecode(token);
  const userId= decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
  // let property = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
  console.log(userId)
  console.log(decodedToken)
  // console.log(property)
  // console.log(this.qrCodeForm.value)
  this.createQR.createQrCode(this.qrCodeForm.value,token, userId).subscribe(res=>{
    console.log(res)
    console.log('gkgkgk')
   this.route.navigate(['myqrcodes'])
  },err=>{
    // this.route.navigate(['myqrcodes'])
    console.log(err)
  })
//   var myHeaders = new Headers();
// myHeaders.append('Content-Type', 'application/json');

// var raw = JSON.stringify({
//   QRName: '124412124',
//   URLValue: 'https://google.com'
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
// };

// fetch('http://minanicola-001-site1.atempurl.com/api/QRCode', requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
  
}
}
