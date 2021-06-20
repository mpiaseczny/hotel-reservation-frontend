import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {RoomSearchRequest} from '../shared/model/room-search-request';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
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

  @ViewChild('roomSearchForm')
  roomSearchForm: NgForm;

  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {}

  searchRoom() {
    if (this.roomSearchForm.invalid) {
      this.roomSearchForm.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Nie wpisano nazwy pokoju lub miasta',
      });
      return;
    }

    this.router.navigate(['room-search'], {
      queryParams: {
        hotelNameOrCity: this.roomSearchRequest.hotelNameOrCity,
        people: this.roomSearchRequest.people,
        dateFrom: this.roomSearchRequest.dateFrom,
        dateTo: this.roomSearchRequest.dateTo,
      },
    });
  }

  onDateFromChange($event: any) {
    this.roomSearchRequest.dateFrom = new Date($event).getTime();
  }

  onDateToChange($event: any) {
    this.roomSearchRequest.dateTo = new Date($event).getTime();
  }
}

