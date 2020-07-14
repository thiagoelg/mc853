import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { DataTableComponent } from './data-table/data-table.component';
import { FormFillComponent } from './form-fill/form-fill.component';

@NgModule({
  declarations: [FormFillComponent, DataTableComponent],
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule],
  exports: [FormFillComponent, DataTableComponent],
})
export class SharedModule { }
