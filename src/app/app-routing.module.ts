import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {HotelSearchComponent} from './hotels/hotel-search/hotel-search.component';
import {RoomSearchComponent} from './rooms/room-search/room-search.component';
import {RoomViewComponent} from './rooms/room-view/room-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'hotel-search', component: HotelSearchComponent },
  { path: 'room-search', component: RoomSearchComponent },
  { path: 'room-view/:roomId', component: RoomViewComponent },
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
