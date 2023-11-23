import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PixelWarTableComponent } from './components/pixel-war-table/pixel-war-table.component';

const routes: Routes = [{ path: '', component: PixelWarTableComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
