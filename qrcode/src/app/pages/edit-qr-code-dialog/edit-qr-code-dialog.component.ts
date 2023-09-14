import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateQrCodeService } from 'src/app/services/create-qr-code.service';

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
  ngOnInit(): void {
    this.editForm=this.formBuilder.group({
      QRName : new FormControl('')
    })
  }
  closeDialog(){
    this.dialogRef.close()
  }
  submit()
  {
    this.qrService.editName(this.editForm.value,this.data.id).subscribe(res=>{
      this.closeDialog()
      console.log(res)
    })
  }
}
