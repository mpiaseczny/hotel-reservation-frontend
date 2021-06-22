import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {HotelSearchComponent} from './hotels/hotel-search/hotel-search.component';
import {RoomSearchComponent} from './rooms/room-search/room-search.component';
import {RoomViewComponent} from './rooms/room-view/room-view.component';
import {ReservationListComponent} from './reservations/reservation-list/reservation-list.component';
import {ReservationViewComponent} from './reservations/reservation-view/reservation-view.component';
import {AuthGuard} from './auth/shared/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: {title: 'Logowanie'} },
  { path: 'signup', component: SignupComponent, data: {title: 'Rejestracja'} },
  { path: 'hotel-search', component: HotelSearchComponent, data: {title: 'Hotele'} },
  { path: 'room-search', component: RoomSearchComponent, data: {title: 'Pokoje'} },
  { path: 'room/:roomId', component: RoomViewComponent, data: {title: 'Pokój'} },
  { path: 'reservations', component: ReservationListComponent, canActivate: [AuthGuard], data: {title: 'Rezerwacje'} },
  { path: 'reservation/:reservationId', component: ReservationViewComponent, canActivate: [AuthGuard], data: {title: 'Rezerwacja'} },
  { path: '', component: LandingPageComponent, pathMatch: 'full', data: {title: 'Strona główna'} },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
