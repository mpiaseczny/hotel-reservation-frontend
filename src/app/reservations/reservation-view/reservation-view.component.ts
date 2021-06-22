import { Component, OnInit } from '@angular/core';
import { ReservationDto } from '../../shared/model/reservation-dto';
import { ReservationService } from '../../shared/reservation.service';
import {ActivatedRoute, Router} from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  allFeatures,
  featuresTranslationMap,
  FeatureType,
} from '../../shared/model/feature.type';
import { OpinionRequest } from '../../shared/model/opinion-request';
import { HotelService } from '../../shared/hotel.service';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.scss'],
})
export class ReservationViewComponent implements OnInit {
  reservation: ReservationDto;
  reservationId: number;

  allFeatures: FeatureType[];
  featuresTranslationMap;
  opinionRequest: OpinionRequest = {
    rate: 5,
    comment: '',
  };
  reservationRange: Date[] = [];

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private hotelService: HotelService,
    private router: Router
  ) {
    this.reservationId = this.route.snapshot.params?.reservationId as number;
    this.allFeatures = allFeatures;
    this.featuresTranslationMap = featuresTranslationMap;
  }

  ngOnInit(): void {
    this.reservationService.getReservation(this.reservationId).subscribe(
      (reservation) => {
        this.reservation = reservation;
        this.reservationRange[0] = new Date(this.reservation.dateFrom);
        this.reservationRange[1] = new Date(this.reservation.dateTo);
      },
      () => {
        this.router.navigate(['reservations']);
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd przy pobieraniu rezerwacji',
        });
      }
    );
  }

  get roomContainsFeature(): (feature: string, features: string[]) => boolean {
    return (feature: string, features: string[]) => features?.includes(feature);
  }

  onOpinionAdd() {
    if (this.opinionRequest.comment === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Pole opinii jest puste',
      });
      return;
    }

    this.hotelService
      .addOpinion(this.reservation.hotelId, this.opinionRequest)
      .subscribe(
        (opinionDto) => {
          this.reservation.opinions.push(opinionDto);
          this.opinionRequest.comment = '';
          this.messageService.add({
            severity: 'success',
            summary: 'Dodano komentarz',
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Błąd przy dodawaniu komentarza',
          });
        }
      );
  }
}
