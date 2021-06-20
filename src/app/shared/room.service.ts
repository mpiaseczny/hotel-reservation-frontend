import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RoomListItem } from './model/room-list-item';
import { RoomDto } from './model/room-dto';
import { TimeInterval } from './model/time-interval';
import { RoomRequest } from './model/room-request';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getRooms(
    nameOrCity: string,
    dateFrom: number,
    dateTo: number,
    people: number
  ): Observable<RoomListItem[]> { // room-search
    const params = new HttpParams();
    params.append('nameOrCity', nameOrCity);
    if (dateFrom !== null && dateFrom !== undefined) {
      params.append('dateFrom', dateFrom + '');
    }
    if (dateTo !== null && dateTo !== undefined) {
      params.append('dateTo', dateTo + '');
    }
    if (people !== null && people !== undefined) {
      params.append('people', people + '');
    }

    return this.http.get<RoomListItem[]>(`${environment.apiUrl}/rooms`);
  }

  getRoom(roomId: number): Observable<RoomDto> { // room
    return this.http.get<RoomDto>(`${environment.apiUrl}/rooms/${roomId}`);
  }

  getReservationTimes(roomId: number): Observable<TimeInterval[]> { // room pop-up
    return this.http.get<TimeInterval[]>(
      `${environment.apiUrl}/rooms/${roomId}/reservation-times`
    );
  }

  addRoom(roomRequest: RoomRequest): Observable<RoomDto> { // hotel-search pop-up
    return this.http.post<RoomDto>(`${environment.apiUrl}/rooms`, roomRequest);
  }

  updateRoom(roomId: number, roomRequest: RoomRequest): Observable<RoomDto> { // hotel-search pop-up
    return this.http.put<RoomDto>(
      `${environment.apiUrl}/rooms/${roomId}`,
      roomRequest
    );
  }

  deleteRoom(roomId: number): Observable<number> { // hotel-search
    return this.http.delete<number>(`${environment.apiUrl}/rooms/${roomId}`);
  }
}
