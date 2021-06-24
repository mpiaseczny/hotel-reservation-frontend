import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HotelDto } from '../../shared/model/hotel-dto';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {HotelService} from '../../shared/hotel.service';
import {AddNewHotelInterface} from '../hotel-search/hotel-search.component';

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
  editment: boolean = false;

  @ViewChild('form')
  form: NgForm;
  savedClicked: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    const editedHotel = this.config?.data?.hotel;
    this.editment = !!editedHotel;
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
      console.log(file.name + ' ready');
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
    this.savedClicked = true;

    if (this.editment) {
      this.hotelService.updateHotel(this.hotelDto.id, this.hotelDto).subscribe(
        (updatedHotel) => {
          const info: AddNewHotelInterface = {
            success: true,
            updatedHotel
          };
          this.ref.close(info);
        },
        () => {
          const info: AddNewHotelInterface = {
            success: false,
            updatedHotel: {}
          };
          this.ref.close(info);
        }
      );
    } else {
      this.hotelService.addHotel(this.hotelDto).subscribe(
        () => {
          const info: AddNewHotelInterface = {
            success: true,
            updatedHotel: null
          };
          this.ref.close(info);
        },
        () => {
          const info: AddNewHotelInterface = {
            success: false,
            updatedHotel: null
          };
          this.ref.close(info);
        }
      );
    }
  }
}
