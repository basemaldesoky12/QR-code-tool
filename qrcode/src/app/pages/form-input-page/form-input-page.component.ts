import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateQrCodeService } from 'src/app/services/create-qr-code.service';

@Component({
  selector: 'app-form-input-page',
  templateUrl: './form-input-page.component.html',
  styleUrls: ['./form-input-page.component.css']
})
export class FormInputPageComponent implements OnInit {
 qrCodeForm !: FormGroup
  constructor(private route :Router, 
    private fb : FormBuilder,
    private createQR : CreateQrCodeService
    ){
       this.qrCodeForm= this.fb.group({
        URLValue : new FormControl(''),
        QRName : new FormControl('')
      })
    }
  ngOnInit(): void {
  }
  generate()
{
  console.log(this.qrCodeForm.value)
  this.createQR.createQrCode(this.qrCodeForm.value).subscribe(res=>{
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
