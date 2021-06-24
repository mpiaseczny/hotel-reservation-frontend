import { Component, OnInit } from '@angular/core';
import { HotelDto } from '../../shared/model/hotel-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../shared/hotel.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AddNewHotelComponent } from '../add-new-hotel/add-new-hotel.component';
import { RoomDialogComponent } from '../../rooms/room-dialog/room-dialog.component';
import { RoomRequest } from '../../shared/model/room-request';
import { RoomService } from '../../shared/room.service';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss'],
  providers: [DialogService],
})
export class HotelSearchComponent implements OnInit {
  hotels: HotelDto[] = [];
  city: string;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private roomService: RoomService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.city = params?.city;
    });
  }

  ngOnInit(): void {
    this.getHotels();
  }

  searchHotels() {
    this.getHotels();
  }

  private getHotels(): void {
    this.hotelService.getHotels(this.city).subscribe(
      (hotels) => {
        this.hotels = hotels || [];
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd przy pobieraniu listy hoteli',
        });
      }
    );
  }

  showAddDialog() {
    const ref = this.dialogService.open(AddNewHotelComponent, {
      header: 'Dodaj nowy hotel',
      width: '70%',
      baseZIndex: 100,
    });

    ref.onClose.subscribe((info: AddNewHotelInterface) => {
      if (info.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Pomyślnie dodano nowy hotel',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd przy dodawaniu hotelu',
        });
      }
    });
  }

  onEdit(hotel: HotelDto) {
    const ref = this.dialogService.open(AddNewHotelComponent, {
      header: 'Edytuj hotel',
      width: '70%',
      baseZIndex: 100,
      data: { hotel },
    });

    ref.onClose.subscribe((info: AddNewHotelInterface) => {
      if (info.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Zaktualizowano hotel ' + info?.updatedHotel?.name,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd przy aktualizacji hotelu',
        });
      }
    });
  }

  onDelete(hotel: HotelDto) {
    this.confirmationService.confirm({
      header: 'Czy na pewno chcesz usunąć ' + hotel?.name + '?',
      accept: () => {
        this.hotelService.deleteHotel(hotel.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary:
              'Pomyślnie usunięto hotel i powiązane z nim pokoje i rezerwacje',
          });
          this.getHotels();
        });
      },
    });
  }

  showAddRoomDialog(hotelId: number) {
    const ref = this.dialogService.open(RoomDialogComponent, {
      header: 'Dodaj pokój',
      width: '70%',
      baseZIndex: 100,
      data: { hotelId },
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Pomyślnie dodano pokój',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd przy dodawaniu pokoju',
        });
      }
    });
  }

  onHotelNameClick(name: string) {
    this.router.navigate(['room-search'], {
      queryParams: {
        hotelNameOrCity: name,
      },
    });
  }
}

export interface AddNewHotelInterface {
  success?: boolean;
  updatedHotel?: HotelDto;
}
