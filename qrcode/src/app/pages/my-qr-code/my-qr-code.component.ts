import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateQrCodeService } from 'src/app/services/create-qr-code.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditQrCodeDialogComponent } from '../edit-qr-code-dialog/edit-qr-code-dialog.component';

@Component({
  selector: 'app-my-qr-code',
  templateUrl: './my-qr-code.component.html',
  styleUrls: ['./my-qr-code.component.css']
})
export class MyQrCodeComponent implements OnInit {
  QRCodes : any
 constructor(private qrcodeService : CreateQrCodeService,private route : Router,public dialog : MatDialog){}
  ngOnInit(): void {

    this.qrcodeService.getAllQrCodes().subscribe(res=>{
      console.log(res)
      this.QRCodes = res
    },err=>{
      console.log(err)
    })
  }

  getDeatils(id:any)
  {
    this.route.navigate(['qrcodedetails',id])
  }
 openEditDialog(id:any)
 {
  const dialogConfig= new MatDialogConfig();
  dialogConfig.disableClose=true;
  dialogConfig.width="50%";
  dialogConfig.height="50%";
  dialogConfig.data ={id : id}
  this.dialog.open(EditQrCodeDialogComponent,dialogConfig)
  this.dialog.afterAllClosed.subscribe(()=>{
    this.ngOnInit()
  })
 }
}
