import { ViewOneMedicComponent } from './../../components/medics/view-one-medic/view-one-medic.component';
import { MedicPriceComponent } from './../../components/prefrence/MedicPrice/MedicPrice.component';
import { SpiritComponent } from './../../components/prefrence/spirit/spirit.component';
import { InternalComponent } from './../../components/prefrence/internal/internal.component';
import { GlobalComponent } from './../../components/prefrence/global/global.component';
import { BackComponent } from './../../components/prefrence/back/back.component';
import { LegsComponent } from './../../components/prefrence/legs/legs.component';
import { SexsualComponent } from './../../components/prefrence/sexsual/sexsual.component';
import { BodyComponent } from './../../components/prefrence/body/body.component';
import { ArmsComponent } from './../../components/prefrence/arms/arms.component';
import { NeckComponent } from './../../components/prefrence/neck/neck.component';
import { HeadComponent } from './../../components/prefrence/head/head.component';
import { NegativeComponent } from './../../components/prefrence/negative/negative.component';
import { PositiveComponent } from './../../components/prefrence/positive/positive.component';
import { PreferenceComponent } from './../../components/prefrence/preference/preference.component';
import { RegisterComponent } from './../../components/app-parts/register/register.component';
import { LoginComponent } from './../../components/app-parts/login/login.component';
import { OneMedicComponent } from './../../components/medics/one-medic/one-medic.component';
import { NewMedicComponent } from './../../components/medics/new-medic/new-medic.component';
import { EditPointComponent } from './../../components/points/edit-point/edit-point.component';
import { NewPointComponent } from './../../components/points/new-point/new-point.component';
import { OilDetailsComponent } from './../../components/oils/oil-details/oil-details.component';
import { EditOilComponent } from './../../components/oils/edit-oil/edit-oil.component';
import { ViewOneCustomerComponent } from './../../components/customers-components/view-one-customer/view-one-customer.component';
import { EditCustomerComponent } from './../../components/customers-components/edit-customer/edit-customer.component';
import { NewCustomerComponent } from './../../components/customers-components/new-customer/new-customer.component';
import { ViewmedicsComponent } from './../../components/medics/viewmedics/viewmedics.component';
import { ViewpointsComponent } from '../../components/points/viewpoints/viewpoints.component';
import { ViewOilsComponent } from './../../components/oils/view-oils/view-oils.component';
import { UsersComponent } from './../../components/users-components/users/users.component';
import { ViewCustomer } from './../../components/customers-components/view-component/view-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router'
import { NewOilComponent } from 'src/components/oils/new-oil/new-oil.component';
import { OnePointComponent } from 'src/components/points/one-point/one-point.component';
import { AuthGuard } from '../guards/auth.guard';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';


const appRoute:Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'patient'
  },
  {
    path: 'home',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path:'patient',
    component:ViewCustomer,
    canActivate: [AuthGuard],
  },
  {
    path: 'patient/new',
    component: NewCustomerComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'patient/:id/edit',
    component: EditCustomerComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'patient/:id/view',
    component: ViewOneCustomerComponent,
    canActivate: [AuthGuard],

  },
  {
    path:'terapist',
    component:UsersComponent,
    canActivate: [AuthGuard],
  },

  {
    path:'points',
    component:ViewpointsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'points/new',
    component: NewPointComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'points/:id/edit',
    component: EditPointComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'points/:id/view',
    component: OnePointComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'medical',
    component:ViewmedicsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medical/:id/new',
    component: NewMedicComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medical/:id/edit',
    component: ViewmedicsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medical/:id/view',
    component: ViewOneMedicComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medical/choose',
    component: OneMedicComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'oils',
    component:ViewOilsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'oils',
    component: ViewOilsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'oils/new',
    component: NewOilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'oils/:id/edit',
    component: EditOilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'oils/:id/view',
    component: OilDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preferences',
    component: PreferenceComponent,

    children: [
      {
        path: 'positive',
        component: PositiveComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'negative',
        component: NegativeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'head',
        component: HeadComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'neck',
        component: NeckComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'arms',
        component: ArmsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'body',
        component: BodyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'sexsual',
        component: SexsualComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'legs',
        component: LegsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'back',
        component: BackComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'global',
        component: GlobalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'internal',
        component: InternalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'spirit',
        component: SpiritComponent,
        canActivate: [AuthGuard],
      },
      {
        path:'prices',
        component:MedicPriceComponent,
        canActivate:[AuthGuard]
      }
    ],
  },

  {
    path: '**',
    component: PagenotfoundComponent,
  },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoute)
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
