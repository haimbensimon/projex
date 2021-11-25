import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule} from '@angular/material/paginator'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatPaginatorModule
  ],
  exports:[
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatMenuModule,
    MatPaginatorModule
  ]
})
export class MaterialModuleModule { }
