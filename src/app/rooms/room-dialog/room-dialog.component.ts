import {Component, ViewChild} from '@angular/core';
import {RoomRequest} from '../../shared/model/room-request';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {NgForm} from '@angular/forms';
import {MessageService, SelectItem} from 'primeng/api';
import {allFeatures, featuresTranslationMap, FeatureType} from '../../shared/model/feature.type';
import {RoomService} from '../../shared/room.service';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss']
})
export class RoomDialogComponent {
  roomRequest: RoomRequest = {
    hotelId: null,
    name: null,
    description: null,
    price: null,
    capacity: null,
    features: [],
    attachments: []
  };

  allFeatures: FeatureType[];
  featuresTranslationMap;
  roomSizeOptions: SelectItem[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  @ViewChild('form')
  form: NgForm;
  savedClicked: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private roomService: RoomService
  ) {
    this.allFeatures = allFeatures;
    this.featuresTranslationMap = featuresTranslationMap;
    const hotelId = this.config?.data?.hotelId;
    if (hotelId) {
      this.roomRequest.hotelId = hotelId;
    }
  }

  onSave() {
    if (this.form.invalid || !this.roomRequest.attachments?.length) {
      this.form.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Wypełnij wszystkie pola',
      });
      return;
    }
    this.savedClicked = true;

    this.roomService.addRoom(this.roomRequest).subscribe(
      () => {
        this.ref.close(true);
      },
      () => {
        this.ref.close(false);
      }
    );
  }

  onFileAdd($event: any) {
    this.roomRequest.attachments = [];
    Array.from($event.files).forEach((file: File) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.roomRequest.attachments.push({
          name: file.name,
          file: fileReader.result,
        });
        console.log(file.name + ' ready');
      };
      fileReader.readAsDataURL(file);
    });
  }
}
