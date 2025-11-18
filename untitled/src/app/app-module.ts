import {CUSTOM_ELEMENTS_SCHEMA, NgModule, provideBrowserGlobalErrorListeners} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import {ThreeDBackgroundComponent} from './three-dbackground/three-dbackground';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    App,
    ThreeDBackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatCardModule,
    MatButtonModule, // Necesario para el botón
    ScrollingModule,
    MatIconModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App],

})
export class AppModule { }
