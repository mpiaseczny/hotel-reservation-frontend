import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  ];

  roomSearchRequest: RoomSearchRequest = {
    city: null,
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
        summary: 'Nie uzupełniono wszystkich pól',
      });
      return;
    }

    this.router.navigate(['hotels'], {
      queryParams: {
        city: this.roomSearchRequest.city,
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

export interface RoomSearchRequest {
  city?: string;
  dateFrom?: number;
  dateTo?: number;
  people?: number;
}