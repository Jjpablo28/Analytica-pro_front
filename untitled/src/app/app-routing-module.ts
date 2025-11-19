import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ThreeDBackgroundComponent} from './three-dbackground/three-dbackground';

const routes: Routes = [

  {path:'a',component:ThreeDBackgroundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
