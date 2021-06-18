import {FeatureType} from './feature.type';
import {FileWrapper} from './file-wrapper';

export interface RoomRequest {
  hotelId?: number;
  name?: string;
  description?: string;
  price?: number;
  capacity?: number;
  features?: FeatureType[];
  attachments?: FileWrapper[];
}
