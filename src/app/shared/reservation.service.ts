import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationListItem } from './model/reservation-list-item';
import { environment } from '../../environments/environment';
import { ReservationDto } from './model/reservation-dto';
import { ReservationRequest } from './model/reservation-request';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  getReservations(): Observable<ReservationListItem[]> {
    return this.http.get<ReservationListItem[]>(
      `${environment.apiUrl}/reservations`
    );
  }

  getReservation(reservationId: number): Observable<ReservationDto> {
    return this.http.get<ReservationDto>(
      `${environment.apiUrl}/reservations/${reservationId}`
    );
  }

  addReservation(
    reservationRequest: ReservationRequest
  ): Observable<ReservationDto> {
    return this.http.post<ReservationDto>(
      `${environment.apiUrl}/reservations`,
      reservationRequest
    );
  }

  deleteReservation(reservationId: number): Observable<number> {
    return this.http.delete<number>(
      `${environment.apiUrl}/reservations/${reservationId}`
    );
  }
}
