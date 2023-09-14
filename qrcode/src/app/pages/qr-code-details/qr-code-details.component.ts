import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateQrCodeService } from 'src/app/services/create-qr-code.service';

@Component({
  selector: 'app-qr-code-details',
  templateUrl: './qr-code-details.component.html',
  styleUrls: ['./qr-code-details.component.css']
})
export class QrCodeDetailsComponent implements OnInit {
  Details : any
  id: any
   constructor(private activatedRoute : ActivatedRoute,
     private qrcodeService : CreateQrCodeService){
      this.id = this.activatedRoute.snapshot.paramMap.get('id')
     }
  ngOnInit(): void {
     this.qrcodeService.qrcodeDetails(this.id).subscribe(res=>{
      this.Details=res
      console.log(this.Details)
     })
  }

}
