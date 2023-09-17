import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateQrCodeService } from 'src/app/services/create-qr-code.service';
import jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-edit-qr-code-dialog',
  templateUrl: './edit-qr-code-dialog.component.html',
  styleUrls: ['./edit-qr-code-dialog.component.css']
})
export class EditQrCodeDialogComponent implements OnInit {
  editForm !: FormGroup
 constructor(
  @Inject(MAT_DIALOG_DATA) public data : any,
  public dialogRef : MatDialogRef<EditQrCodeDialogComponent>,
  private formBuilder : FormBuilder,
  private qrService : CreateQrCodeService){}
  editError : boolean = false
  errorMessage : string = ''
  ngOnInit(): void {
    this.editForm=this.formBuilder.group({
      QRName :['',[Validators.required,     Validators.pattern('^[A-Za-z]{3,}(\\s?[A-Za-z]+)*$')]]
    })
  }
  closeDialog(){
    this.dialogRef.close()
  }
  submit()
  {
    let token = localStorage.getItem('token')!
    const decodedToken: any = jwtDecode(token);
    const userId= decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']  
    this.qrService.editName(this.editForm.value,this.data.id,token,userId).subscribe(res=>{
      this.closeDialog()
      console.log(res)
    },err=>{
      if(err.status==401)
      {
         this.editError=true
         this.errorMessage=err.error
      }
    })
  }
}
