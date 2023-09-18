import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateQrCodeService } from 'src/app/services/create-qr-code.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditQrCodeDialogComponent } from '../edit-qr-code-dialog/edit-qr-code-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-qr-code',
  templateUrl: './my-qr-code.component.html',
  styleUrls: ['./my-qr-code.component.css']
})
export class MyQrCodeComponent implements OnInit {
  QRCodes : any
  hashValue : any
  itemsPerPage =4
  p =1
 constructor(private qrcodeService : CreateQrCodeService,private route : Router,public dialog : MatDialog, private authService : AuthService){}
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
 openDeleteDialog(id : any)
 {
  const dialogConfig= new MatDialogConfig();
  dialogConfig.disableClose=true;
  dialogConfig.width="50%";
  dialogConfig.height="50%";
  dialogConfig.data ={id : id}
  this.dialog.open(DeleteDialogComponent,dialogConfig)
  this.dialog.afterAllClosed.subscribe(()=>{
    this.ngOnInit()
  })
 }
 logout()
 {
   this.authService.logout()
   if(this.authService.loggedIn()==false)
   {
    this.route.navigate([''])
   }
 }
 routeToHash(hashValue:any)
 {
  this.route.navigate([`/${hashValue}`])
 }
}
