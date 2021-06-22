import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomDto } from '../../shared/model/room-dto';
import { RoomService } from '../../shared/room.service';
import { MessageService } from 'primeng/api';
import {
  allFeatures,
  featuresTranslationMap,
  FeatureType,
} from '../../shared/model/feature.type';
import { ReservationRequest } from '../../shared/model/reservation-request';
import { ReservationService } from '../../shared/reservation.service';
import * as dayjs from 'dayjs';
import { HotelService } from '../../shared/hotel.service';
import { OpinionRequest } from '../../shared/model/opinion-request';
import { AuthService } from '../../auth/shared/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent implements OnInit {
  roomId: number;
  room: RoomDto;
  reservedDates: Date[] = [];

  opinionRequest: OpinionRequest = {
    rate: 5,
    comment: '',
  };

  allFeatures: FeatureType[];
  featuresTranslationMap;

  tomorrow: Date;
  dateFrom: Date;
  dateTo: Date;
  reservationRequest: ReservationRequest = {
    dateFrom: null,
    dateTo: null,
    roomId: null,
    price: 0,
  };
  dates: Date[];

  @ViewChild('reservationForm')
  reservationForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private messageService: MessageService,
    private reservationService: ReservationService,
    private hotelService: HotelService,
    public authService: AuthService
  ) {
    this.roomId = this.route.snapshot.params?.roomId as number;
    this.reservationRequest.roomId = this.roomId;
    this.allFeatures = allFeatures;
    this.featuresTranslationMap = featuresTranslationMap;
  }

  get roomContainsFeature(): (feature: string, features: string[]) => boolean {
    return (feature: string, features: string[]) => features?.includes(feature);
  }

  ngOnInit(): void {
    this.tomorrow = new Date();
    this.tomorrow.setFullYear(
      this.tomorrow.getFullYear(),
      this.tomorrow.getMonth(),
      this.tomorrow.getDate() + 1
    );

    this.roomService.getRoom(this.roomId).subscribe(
      (room) => {
        this.room = room;
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd przy pobieraniu danych pokoju',
        });
      }
    );

    this.roomService.getReservationTimes(this.roomId).subscribe(
      (reservationTimes) => {
        reservationTimes?.forEach((reservationTime) => {
          this.reservedDates = [
            ...this.reservedDates,
            ...this.getDaysBetweenDates(
              reservationTime?.dateFrom,
              reservationTime?.dateTo
            ),
          ];
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd przy pobieraniu zarezerwowanych terminów',
        });
      }
    );
  }

  getDaysBetweenDates(startDate, endDate): Date[] {
    const dates = [];
    for (
      const dt = new Date(startDate);
      dt <= endDate;
      dt.setDate(dt.getDate() + 1)
    ) {
      dates.push(new Date(dt));
    }
    return dates;
  }

  onDateChange() {
    if (this.dates[0] && this.dates[1]) {
      this.dates[0].setHours(0, 0, 0, 0);
      this.dates[1].setHours(0, 0, 0, 0);
      const daysBetween = this.getDaysBetweenDates(
        this.dates[0],
        this.dates[1]
      );
      if (
        daysBetween.some((day) =>
          this.reservedDates.find(
            (reservedDay) => reservedDay.getTime() === day.getTime()
          )
        )
      ) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Kolizja z inną rezerwacją. Wybierz inne daty',
        });
        this.dates = null;
        this.reservationRequest.price = 0;
        return;
      }
      const firstDateTimestamp = new Date(this.dates[0]).getTime();
      const secondsDateTimestamp = new Date(this.dates[1]).getTime();
      this.reservationRequest.dateFrom =
        firstDateTimestamp < secondsDateTimestamp
          ? firstDateTimestamp
          : secondsDateTimestamp;
      this.reservationRequest.dateTo =
        firstDateTimestamp < secondsDateTimestamp
          ? secondsDateTimestamp
          : firstDateTimestamp;

      const daysCount = Math.abs(
        dayjs(this.dates[1]).diff(dayjs(this.dates[0]), 'days')
      );
      this.reservationRequest.price = daysCount * this.room.price;
      return;
    }

    this.reservationRequest.dateFrom = null;
    this.reservationRequest.dateTo = null;
    this.reservationRequest.price = 0;
  }

  onReserve() {
    if (
      !this.reservationRequest.dateFrom ||
      !this.reservationRequest.dateTo ||
      this.reservationRequest.dateFrom === this.reservationRequest.dateTo
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Zaznacz zakres dat do rezerwacji',
      });
      return;
    }

    this.reservationService.addReservation(this.reservationRequest).subscribe(
      (reservationDto) => {
        this.messageService.add({
          severity: 'success',
          summary:
            'Pomyślnie dokonano rezerwacji pokoju w ' +
            reservationDto?.hotelName,
          detail: 'Twoje rezerwacje są widoczne w zakładce Moje rezerwacje',
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Zarezerwowano już ten termin',
        });
      }
    );
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
      .addOpinion(this.room.hotelId, this.opinionRequest)
      .subscribe(
        (opinionDto) => {
          this.room.opinions.push(opinionDto);
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
