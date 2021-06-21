import {FeatureType} from './feature.type';
import {FileWrapper} from './file-wrapper';
import {OpinionDto} from './opinion-dto';

export interface RoomDto {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  capacity?: number;
  features?: FeatureType[];
  attachments?: FileWrapper[];
  opinions?: OpinionDto[];
  hotelId: number;
  hotelName?: string;
  rating?: number;
  city?: string;
  street?: string;
  phoneNumber?: string;
  email?: string;
}
