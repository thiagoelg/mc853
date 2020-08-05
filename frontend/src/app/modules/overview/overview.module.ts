import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, AppMaterialModule, OverviewRoutingModule, SharedModule],
})
export class OverviewModule {}
