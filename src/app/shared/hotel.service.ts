import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HotelDto } from './model/hotel-dto';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { OpinionRequest } from './model/opinion-request';
import { OpinionDto } from './model/opinion-dto';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient) {}

  getHotels(city: string): Observable<HotelDto[]> {
    const queryParam = city ? new HttpParams().append('city', city) : null;

    return this.http.get<HotelDto[]>(`${environment.apiUrl}/hotels`, {
      params: queryParam,
    });
  }

  addHotel(hotelDto: HotelDto): Observable<HotelDto> {
    return this.http.post<HotelDto>(`${environment.apiUrl}/hotels`, hotelDto);
  }

  updateHotel(hotelId: number, hotelDto: HotelDto): Observable<HotelDto> {
    return this.http.put<HotelDto>(
      `${environment.apiUrl}/hotels/${hotelId}`,
      hotelDto
    );
  }

  deleteHotel(hotelId: number): Observable<number> {
    return this.http.delete<number>(`${environment.apiUrl}/hotels/${hotelId}`);
  }

  addOpinion(
    hotelId: number,
    opinionRequest: OpinionRequest
  ): Observable<OpinionDto> {
    return this.http.post<OpinionDto>(
      `${environment.apiUrl}/hotels/${hotelId}/opinions`,
      opinionRequest
    );
  }
}
