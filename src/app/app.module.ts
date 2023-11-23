import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PixelWarTableComponent } from './components/pixel-war-table/pixel-war-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, PixelWarTableComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
