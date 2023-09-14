import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormInputPageComponent } from './form-input-page/form-input-page.component';
import { MyQrCodeComponent } from './my-qr-code/my-qr-code.component';
import { UserDataComponent } from './user-data/user-data.component';
import { QrCodeDetailsComponent } from './qr-code-details/qr-code-details.component';

const pagesRoutes : Routes = [
{path : '', component : HomeComponent},
{path : 'generationform' , component: FormInputPageComponent},
{path : 'myqrcodes', component : MyQrCodeComponent},
{path : 'hash/:hash',component : UserDataComponent},
{path : 'qrcodedetails/:id', component : QrCodeDetailsComponent}
]

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
