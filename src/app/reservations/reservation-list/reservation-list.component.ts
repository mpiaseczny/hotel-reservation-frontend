import { Component, OnInit } from '@angular/core';
import {ReservationListItem} from '../../shared/model/reservation-list-item';
import {ReservationService} from '../../shared/reservation.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  reservations: ReservationListItem[] = [];

  constructor(private reservationService: ReservationService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getReservations();
  }

  private getReservations() {
    this.reservationService.getReservations().subscribe((reservations) => {
      this.reservations = reservations || [];
    }, () => {
      this.messageService.add({severity: 'error', summary: 'Błąd przy pobieraniu listy rezerwacji'});
    });
  }

  onRoomNameClick(reservation: ReservationListItem) {
    this.router.navigate(['reservation', reservation?.id]);
  }

  onReservationCancel(reservation: ReservationListItem) {
    this.reservationService.deleteReservation(reservation.id).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Pomyślnie anulowano rezerwację'});
      this.getReservations();
    });
  }
}
