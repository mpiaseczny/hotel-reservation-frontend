import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HotelDto } from '../../shared/model/hotel-dto';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-new-hotel',
  templateUrl: './add-new-hotel.component.html',
  styleUrls: ['./add-new-hotel.component.scss'],
})
export class AddNewHotelComponent implements OnInit {
  hotelDto: HotelDto = {
    name: null,
    rating: null,
    city: null,
    street: null,
    phoneNumber: null,
    email: null,
    attachment: null,
  };

  @ViewChild('form')
  form: NgForm;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const editedHotel = this.config?.data?.hotel;
    if (editedHotel) {
      this.hotelDto = { ...editedHotel };
    }
  }

  onFileAdd($event: any) {
    this.hotelDto.attachment = { name: null, file: null };
    const file = $event.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.hotelDto.attachment = {
        name: file.name,
        file: fileReader.result,
      };
    };
    fileReader.readAsDataURL(file);
  }

  onSave() {
    if (this.form.invalid || this.hotelDto.attachment == null) {
      this.form.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Wypełnij wszystkie pola',
      });
      return;
    }

    this.ref.close(this.hotelDto);
  }
}
