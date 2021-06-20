import {Component, ViewChild} from '@angular/core';
import {RoomRequest} from '../../shared/model/room-request';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {NgForm} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {allFeatures, featuresTranslationMap, FeatureType} from '../../shared/model/feature.type';

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

  @ViewChild('form')
  form: NgForm;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
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

    this.ref.close(this.roomRequest);
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
      };
      fileReader.readAsDataURL(file);
    });
  }
}
