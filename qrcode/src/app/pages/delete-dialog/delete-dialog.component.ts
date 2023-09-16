import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateQrCodeService } from 'src/app/services/create-qr-code.service';
import jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
constructor(
  @Inject(MAT_DIALOG_DATA) public data : any,
  public dialogRef : MatDialogRef<DeleteDialogComponent>,
  private qrService : CreateQrCodeService
){}
  ngOnInit(): void {
  }
  closeDialog()
  {
    this.dialogRef.close()
  }
  DeleteQR()
  {
    let token = localStorage.getItem('token')!
    const decodedToken: any = jwtDecode(token);
    const userId= decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']  
     this.qrService.deleteQrCode(this.data.id,token,userId).subscribe(res=>{
      console.log(res)
      this.closeDialog()
     },err=>{
       console.log(err) 
     })
  }
}
