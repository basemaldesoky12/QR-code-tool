import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MyQrCodeComponent } from './my-qr-code/my-qr-code.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        ReactiveFormsModule,
    ],
 exports :[
    HomeComponent
 ]
})
export class PagesModule { }