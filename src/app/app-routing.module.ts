import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebSocketComponent } from './components/web-socket-component/web-socket-component.component';

const routes: Routes = [{ path: '', component: WebSocketComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
