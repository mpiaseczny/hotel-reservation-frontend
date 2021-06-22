import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { LoginComponent } from './auth/login/login.component';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { SignupComponent } from './auth/signup/signup.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { HotelSearchComponent } from './hotels/hotel-search/hotel-search.component';
import { TokenInterceptor } from './auth/shared/token.interceptor';
import { RoomSearchComponent } from './rooms/room-search/room-search.component';
import { EnableForRoleDirective } from './auth/shared/enable-for-role.directive';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { AddNewHotelComponent } from './hotels/add-new-hotel/add-new-hotel.component';
import { FileUploadModule } from 'primeng/fileupload';
import {RatingModule} from 'primeng/rating';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { RoomDialogComponent } from './rooms/room-dialog/room-dialog.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import { RoomViewComponent } from './rooms/room-view/room-view.component';
import {CarouselModule} from 'primeng/carousel';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { ReservationViewComponent } from './reservations/reservation-view/reservation-view.component';
import { ReservationStatusPipe } from './reservations/reservation-status.pipe';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LandingPageComponent,
    HotelSearchComponent,
    RoomSearchComponent,
    EnableForRoleDirective,
    AddNewHotelComponent,
    RoomDialogComponent,
    RoomViewComponent,
    ReservationListComponent,
    ReservationViewComponent,
    ReservationStatusPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons),
    CommonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    PasswordModule,
    CalendarModule,
    DropdownModule,
    DynamicDialogModule,
    FileUploadModule,
    RatingModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CheckboxModule,
    CarouselModule,
    TooltipModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  entryComponents: [AddNewHotelComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
