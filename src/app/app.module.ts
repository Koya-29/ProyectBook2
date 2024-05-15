import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [],

  providers: [
    provideClientHydration(),
  ],
})
export class AppModule { }
