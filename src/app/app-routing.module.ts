import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {HotelSearchComponent} from './hotels/hotel-search/hotel-search.component';
import {RoomSearchComponent} from './room-search/room-search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'hotel-search', component: HotelSearchComponent },
  { path: 'room-search', component: RoomSearchComponent },
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
