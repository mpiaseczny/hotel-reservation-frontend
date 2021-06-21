import {FeatureType} from './feature.type';
import {FileWrapper} from './file-wrapper';
import {OpinionDto} from './opinion-dto';

export interface ReservationDto {
  id?: number;
  name?: string;
  description?: string;
  capacity?: number;
  features?: FeatureType[];
  attachments?: FileWrapper[];
  dateFrom?: number;
  dateTo?: number;
  totalPrice?: number;
  opinions?: OpinionDto[];
  hotelId: number;
  hotelName?: string;
  rating?: number;
  city?: string;
  street?: string;
  phoneNumber?: string;
  email?: string;
}
