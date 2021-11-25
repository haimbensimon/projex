import { SpinnerComponent } from './../components/app-parts/spinner/spinner.component';
import { ViewOneMedicComponent } from './../components/medics/view-one-medic/view-one-medic.component';
import { MedicPriceComponent } from './../components/prefrence/MedicPrice/MedicPrice.component';
import { SpiritComponent } from './../components/prefrence/spirit/spirit.component';
import { SexsualComponent } from './../components/prefrence/sexsual/sexsual.component';
import { PositiveComponent } from './../components/prefrence/positive/positive.component';
import { NegativeComponent } from './../components/prefrence/negative/negative.component';
import { NeckComponent } from './../components/prefrence/neck/neck.component';
import { LegsComponent } from './../components/prefrence/legs/legs.component';
import { InternalComponent } from './../components/prefrence/internal/internal.component';
import { GlobalComponent } from './../components/prefrence/global/global.component';
import { BodyComponent } from './../components/prefrence/body/body.component';
import { BackComponent } from './../components/prefrence/back/back.component';
import { ArmsComponent } from './../components/prefrence/arms/arms.component';
import {PreferenceComponent} from '../components/prefrence/preference/preference.component'

import { RegisterComponent } from './../components/app-parts/register/register.component';
import { LoginComponent } from './../components/app-parts/login/login.component';
import { OneMedicComponent } from './../components/medics/one-medic/one-medic.component';
import { NewMedicComponent } from './../components/medics/new-medic/new-medic.component';
import { NewPointComponent } from './../components/points/new-point/new-point.component';
import { EditPointComponent } from './../components/points/edit-point/edit-point.component';
import { EditOilComponent } from './../components/oils/edit-oil/edit-oil.component';
import { NewOilComponent } from './../components/oils/new-oil/new-oil.component';
import { ViewOneCustomerComponent } from './../components/customers-components/view-one-customer/view-one-customer.component';
import { NewCustomerComponent } from './../components/customers-components/new-customer/new-customer.component';
import { EditCustomerComponent } from './../components/customers-components/edit-customer/edit-customer.component';
import { environment } from './../environments/environment';
import { ViewmedicsComponent } from './../components/medics/viewmedics/viewmedics.component';
import { ViewpointsComponent } from '../components/points/viewpoints/viewpoints.component';
import { ViewOilsComponent } from './../components/oils/view-oils/view-oils.component';
import { RoutingModule } from './routing/routing.module';
import { ViewCustomer } from './../components/customers-components/view-component/view-component.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat'
import { AppComponent } from './app.component';
import { TopNav } from 'src/components/app-parts/top-vav/top-vav.component';
import { UsersComponent } from 'src/components/users-components/users/users.component';
import { AngularFireStorageModule} from '@angular/fire/compat/storage'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OilDetailsComponent } from 'src/components/oils/oil-details/oil-details.component';
import { CommonModule } from '@angular/common';



import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HeadComponent } from 'src/components/prefrence/head/head.component';
import { MaterialModuleModule } from './material-module/material-module.module';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    AppComponent,
    TopNav,
    LoginComponent,
    RegisterComponent,
    // customer
    ViewCustomer,
    EditCustomerComponent,
    NewCustomerComponent,
    ViewOneCustomerComponent,
    //oil
    ViewOilsComponent,
    OilDetailsComponent,
    NewOilComponent,
    EditOilComponent,
    // point
    EditPointComponent,
    ViewpointsComponent,
    NewPointComponent,
    ViewpointsComponent,
    // user
    UsersComponent,
    // medic
    ViewmedicsComponent,
    NewMedicComponent,
    OneMedicComponent,
    // prefernces
    PreferenceComponent,
    PagenotfoundComponent,
    ArmsComponent,
    BackComponent,
    BodyComponent,
    GlobalComponent,
    HeadComponent,
    InternalComponent,
    LegsComponent,
    NeckComponent,
    NegativeComponent,
    PositiveComponent,
    SexsualComponent,
    SpiritComponent,
    MedicPriceComponent,
    ViewOneMedicComponent,
    SpinnerComponent,
    DataTableComponent



  ],
  imports: [
    BrowserModule,
    CommonModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
