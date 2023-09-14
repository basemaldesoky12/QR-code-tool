import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateQrCodeService } from 'src/app/services/create-qr-code.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
 hashValue : string | null =''
 browserInfo!: string;
 userCountry!: any;
 deviceType!: string;
  constructor(private route : ActivatedRoute,
    private qrcodeService : CreateQrCodeService){
   this.hashValue= this.route.snapshot.paramMap.get('hash')
  }
  ngOnInit(): void {
    const userAgent = navigator.userAgent;

    if (/iPad|iPhone/.test(userAgent)) {
      // It's an iPhone or iPad
      this.deviceType = 'iOS';
    } else if (/Android/.test(userAgent)) {
      // It's an Android device
      this.deviceType = 'Android';
    } else {
      // It's a PC or other device
      this.deviceType = 'PC';
    }

    this.browserInfo = `${navigator.userAgent}`;
     this.qrcodeService.getUserCountry().subscribe((data:any)=>{
      this.userCountry=data
      console.log(this.userCountry.country)
      this.qrcodeService.scanQR(this.userCountry.country,this.deviceType,5,this.browserInfo).subscribe(res=>{
        console.log(res)
       },err=>{
        console.log(err)
       })
     })
     
  }

  }


