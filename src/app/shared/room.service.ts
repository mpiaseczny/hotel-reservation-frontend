import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RoomListItem } from './model/room-list-item';
import { RoomDto } from './model/room-dto';
import { TimeInterval } from './model/time-interval';
import { RoomRequest } from './model/room-request';
import {RoomSearchRequest} from './model/room-search-request';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getRooms(roomSearchRequest: RoomSearchRequest): Observable<RoomListItem[]> { // room-search
    let params = new HttpParams().append('hotelNameOrCity', roomSearchRequest.hotelNameOrCity);
    if (roomSearchRequest?.dateFrom !== null && roomSearchRequest?.dateFrom !== undefined) {
      params = params.append('dateFrom', roomSearchRequest.dateFrom + '');
    }
    if (roomSearchRequest?.dateTo !== null && roomSearchRequest?.dateTo !== undefined) {
      params = params.append('dateTo', roomSearchRequest.dateTo + '');
    }
    if (roomSearchRequest?.people !== null && roomSearchRequest?.people !== undefined) {
      params = params.append('people', roomSearchRequest.people + '');
    }

    return this.http.get<RoomListItem[]>(`${environment.apiUrl}/rooms`, {params});
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
