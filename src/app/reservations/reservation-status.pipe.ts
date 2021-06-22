import { Pipe, PipeTransform } from '@angular/core';
import {ReservationListItem} from '../shared/model/reservation-list-item';

@Pipe({
  name: 'reservationStatus'
})
export class ReservationStatusPipe implements PipeTransform {
  transform(reservations: ReservationListItem[], status: string): ReservationListItem[] {
    const now = Date.now();
    switch (status) {
      case 'active':
        return reservations?.filter((reservation) => reservation?.dateFrom < now && reservation?.dateTo > now);
      case 'future':
        return reservations?.filter((reservation) => reservation?.dateFrom > now);
      case 'history':
        return reservations?.filter((reservation) => reservation.dateTo < now);
      default:
        return reservations;
    }
  }
}
