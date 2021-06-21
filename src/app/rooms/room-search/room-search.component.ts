import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomSearchRequest } from '../../shared/model/room-search-request';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { RoomService } from '../../shared/room.service';
import { RoomListItem } from '../../shared/model/room-list-item';
import {
  allFeatures,
  featuresTranslationMap,
  FeatureType,
} from '../../shared/model/feature.type';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.scss'],
})
export class RoomSearchComponent implements OnInit {
  rooms: RoomListItem[] = [];

  roomSizeOptions: SelectItem[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  roomSearchRequest: RoomSearchRequest = {
    hotelNameOrCity: null,
    dateFrom: null,
    dateTo: null,
    people: null,
  };

  dateFrom: Date;
  dateTo: Date;

  allFeatures: FeatureType[];
  featuresTranslationMap;

  @ViewChild('roomSearchForm')
  roomSearchForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.allFeatures = allFeatures;
    this.featuresTranslationMap = featuresTranslationMap;
    this.route.queryParams.subscribe((params) => {
      this.roomSearchRequest.hotelNameOrCity = params?.hotelNameOrCity;
      this.roomSearchRequest.dateFrom = params?.dateFrom;
      this.roomSearchRequest.dateTo = params?.dateTo;
      this.roomSearchRequest.people = params?.people;
    });
  }

  get roomContainsFeature(): (feature: string, features: string[]) => boolean {
    return (feature: string, features: string[]) => features.includes(feature);
  }

  ngOnInit(): void {
    this.getRooms();
  }

  private getRooms(): void {
    this.roomService
      .getRooms(this.roomSearchRequest)
      .subscribe((roomListItems) => {
        this.rooms = roomListItems || [];
      });
  }

  onDateFromChange($event: any) {
    this.roomSearchRequest.dateFrom = new Date($event).getTime();
  }

  onDateToChange($event: any) {
    this.roomSearchRequest.dateTo = new Date($event).getTime();
  }

  onSearch() {
    if (this.roomSearchForm.invalid) {
      this.roomSearchForm.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Nie wpisano nazwy pokoju lub miasta',
      });
      return;
    }

    this.getRooms();
  }

  onDelete(room: RoomListItem) {
    this.confirmationService.confirm({
      header: 'Czy na pewno chcesz usunąć ' + room?.name + '?',
      accept: () => {
        this.roomService.deleteRoom(room.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary:
              'Pomyślnie usunięto pokój i powiązane z nim rezerwacje',
          });
          this.getRooms();
        });
      },
    });
  }

  onRoomNameClick(room: RoomListItem) {
    this.router.navigate(['room-view', room?.id]);
  }
}
