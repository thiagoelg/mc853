import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AppMaterialModule } from '../app-material/app-material.module';
import { DataTableComponent } from './data-table/data-table.component';
import { FormFillComponent } from './form-fill/form-fill.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadService } from './file-upload/file-upload.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    FormFillComponent,
    DataTableComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MatPaginatorModule
  ],
  exports: [
    FormFillComponent,
    DataTableComponent,
    FileUploadComponent,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [
    FileUploadService
  ]
})
export class SharedModule { }
